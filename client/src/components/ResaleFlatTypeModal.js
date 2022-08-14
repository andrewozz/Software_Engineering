import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../styles/amenitiesStyles/amenities.modules.css";
import { motion } from "framer-motion";
const ResaleFlatTypeModal = (props) => {
  const flatTypeArr = props.flatType;
  const singleFlat = flatTypeArr[0];
  const { currentUser } = useAuth();
  const { block, street_name } = singleFlat;
  const [distRange, setDistRange] = useState(1500);
  const [resLimit, setResLimit] = useState(5);
  const [sMall, setSMall] = useState(null);
  const [sMarket, setSMarket] = useState(null);
  const [sCentre, setSCentre] = useState(null);
  const [busStop, setBusStop] = useState(null);
  const [mrtStation, setMrtStation] = useState(null);
  const [schools, setSchools] = useState(null);
  const [data, setData] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [mapUrl, setMapUrl] = useState(null);
  useEffect(() => {
    const getAmenities = async () => {
      const res = await axios.get(
        `http://localhost:3005/api/amenities/get-amenities-near-flats?blockNum=${block}&streetName=${street_name}&distRange=${distRange}&resLimit=${resLimit}`
      );
      const resData = res.data;
      console.log(resData);
      setData(resData);
      setSMall(resData.shoppingMall);
      setSMarket(resData.superMarket);
      setSCentre(resData.sportsCentre);
      setBusStop(resData.publicTransportBus);
      setMrtStation(resData.publicTransportTrain);
      setSchools(resData.schools);
      setMapUrl(resData.mapInUrl);
      setLongitude(resData.longitude);
      setLatitude(resData.latitude);
    };
    getAmenities();
  }, [currentUser.uid]);
  const modalVariants = {
    initial: {
      scale: 0.1,
      opacity: 0,
      transition: {
        duration: 1.5,
      },
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        delay: 1,
        duration: 1.5,
      },
    },
  };
  return (
    <>
      <motion.div
        className="custom-modal-bg"
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="initial"
      >
        <div className="resale-flat-type-modal">
          <div
            className="close"
            onClick={() => {
              props.closeFunction(false);
            }}
          >
            x
          </div>
          <div className="resale-flat-type-info">
            <h3>Nearby Amenities</h3>
            {data && (
              <section className="amenities-list">
                <div className="flat-amenities-info">
                  <div>
                    {sMall && (
                      <div>
                        <p>
                          <b>Shopping Mall</b>
                        </p>
                        {sMall.map((mall, index) => {
                          return (
                            <div key={index}>
                              <p>Shopping Mall: {mall.name}</p>
                              <p>Location: {mall.formatted}</p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <div>
                    {sMarket && (
                      <div>
                        <p>
                          <b>Supermarket</b>
                        </p>
                        {sMarket.map((superMarket, index) => {
                          return (
                            <div key={index}>
                              <p>Super Market: {superMarket.name}</p>
                              <p>Location: {superMarket.formatted}</p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <div>
                    {sCentre && (
                      <div>
                        <p>
                          <b>Sports Centre</b>
                        </p>
                        {sCentre.map((sportsCentre, index) => {
                          return (
                            <div key={index}>
                              <p>Sports Centre: {sportsCentre.name}</p>
                              <p>Location: {sportsCentre.formatted}</p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <div>
                    {busStop && (
                      <div>
                        <p>
                          <b>Bus Stop</b>
                        </p>
                        {busStop.map((bstop, index) => {
                          return (
                            <div key={index}>
                              <p>Bus Stop: {bstop.name}</p>
                              <p>Location: {bstop.formatted}</p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <div>
                    {mrtStation && (
                      <div>
                        <p>
                          <b>MRT Station</b>
                        </p>
                        {mrtStation.map((station, index) => {
                          return (
                            <div key={index}>
                              <p>Station: {station.name}</p>
                              <p>Location: {station.formatted}</p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <div>
                    {schools && (
                      <div>
                        <p>
                          <b>Schools</b>
                        </p>
                        {schools.map((sch, index) => {
                          return (
                            <div key={index}>
                              <p>School Name: {sch.name}</p>
                              <p>Location: {sch.formatted}</p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}
          </div>

          <div className="resale-flat-type-transactions">
            {/* render a list of transactions using map() */}
            {
              <motion.div
                layout
                initial={{ y: "70vh" }}
                animate={{ y: "0" }}
                transition={{
                  duration: 1.2,
                  type: "spring",
                  stiffness: "120",
                }}
              >
                {flatTypeArr.map((flat, index) => {
                  const {
                    month,
                    street_name,
                    block,
                    storey_range,
                    flat_model,
                    flat_type,
                    remaining_lease,
                    resale_price,
                  } = flat;
                  return (
                    <div key={index} className="resale-flat-transactions">
                      <div>
                        {" "}
                        <b>Transaction Date: {month}</b>
                      </div>
                      <li>
                        <span>
                          <b>Street Name:</b>{" "}
                        </span>
                        {block + " " + street_name}
                      </li>
                      <li>
                        <span>
                          <b>Storey range:</b>{" "}
                        </span>
                        {storey_range}
                      </li>
                      <li>
                        <span>
                          <b>Flat model:</b>{" "}
                        </span>
                        {flat_model}
                      </li>
                      <li>
                        <span>
                          <b>Flat Type:</b>{" "}
                        </span>
                        {flat_type}
                      </li>
                      <li>
                        {" "}
                        <span>
                          <b>Remaining Lease time:</b>{" "}
                        </span>
                        {remaining_lease}
                      </li>
                      <li>
                        {" "}
                        <span>
                          <b>Resale price:</b>{" "}
                        </span>
                        {resale_price}
                      </li>
                    </div>
                  );
                })}
              </motion.div>
            }
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ResaleFlatTypeModal;
