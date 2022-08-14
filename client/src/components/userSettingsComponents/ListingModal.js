import React, { useState, useRef } from "react";

import { useAuth } from "../../context/AuthContext";
import { useFlatsListing } from "../../context/FlatsListingContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const ListingModal = (props) => {
  const navigate = useNavigate();

  const {
    flatListedState,
    flatSelectedId,
    updateListedFlat,
    setFlatListedState,
    deleteListedFlat,
    dflatListedState,
    setdFlatListedState,
  } = useFlatsListing();
  console.log(flatSelectedId);
  const { currentUser } = useAuth();
  const townRef = useRef();
  const blockRef = useRef();
  const streetNameRef = useRef();
  const unitNoRef = useRef();
  const flatTypeRef = useRef();
  const sftRef = useRef();
  const resalePriceRef = useRef();
  const remainingLeaseRef = useRef();
  const addInfoRef = useRef();
  const style1 = {
    lineHeight: "0.3",
    fontSize: "18px",
    textAlign: "start",
    paddingTop : "15px"
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(townRef.current.value);
    const flatObj = {
      uid: currentUser.uid,
      fid: flatSelectedId,
      townReq: townRef.current.value,
      streetReq: streetNameRef.current.value,
      blockReq: blockRef.current.value,
      unitNoReq: unitNoRef.current.value,
      resalePriceReq: resalePriceRef.current.value,
      flatTypeReq: flatTypeRef.current.value,
      sftReq: sftRef.current.value,
      remainingLeaseReq: remainingLeaseRef.current.value,
      addInfoReq: addInfoRef.current.value,
    };
    updateListedFlat(flatObj);
    setFlatListedState(!flatListedState);
    props.closeModalFunction(false);
    navigate("/settings");
  };
  const handleDelete = () => {
    const flatObj = {
      uid: currentUser.uid,
      fid: flatSelectedId,
    };
    deleteListedFlat(flatObj);
    setdFlatListedState(!dflatListedState);
    props.closeModalFunction(false);

    navigate("/settings");
  };
  // console.log(flatListedState);
  const listingModalVariant = {
    initial: {
      scale: 0.1,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
    exit: {
      rotateZ: -160,
      rotateY: -150,
      opacity: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.4,
      },
    },
  };
  console.log(flatListedState);

  return (
    <motion.div
      className="custom-modal-bg"
      variants={listingModalVariant}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="listing-modal custom-modal">
        <div
          className="close"
          onClick={() => {
            props.closeModalFunction(false);
          }}
        >
          x
        </div>
        <h3>Update Listing</h3>
        <div className="container">
          <form onSubmit={handleUpdate}>
          <label><p style={style1}>Town</p></label>
            <input type="text" placeholder="Town" ref={townRef}></input>
            <label><p style={style1}>Block</p></label>
            <input type="text" placeholder="Block" ref={blockRef}></input>
            <label><p style={style1}>Street Name</p></label>
            <input
              type="text"
              placeholder="street Name"
              ref={streetNameRef}
            ></input>
            <label><p style={style1}>Unit Number</p></label>
            <input type="text" placeholder="Unit No" ref={unitNoRef}></input>
            <label><p style={style1}>Flat Type</p></label>
            <input
              type="text"
              placeholder="Flat Type"
              ref={flatTypeRef}
            ></input>
            <label><p style={style1}>Size (sqft)</p></label>
            <input type="text" placeholder="Size (sqft)" ref={sftRef}></input>
            <label><p style={style1}>Resale Price</p></label>
            <input
              type="text"
              placeholder="Resale Price"
              ref={resalePriceRef}
            ></input>
            <label><p style={style1}>Remaining Lease</p></label>
            <input
              type="text"
              placeholder="Remaining Lease"
              ref={remainingLeaseRef}
            ></input>
            <label><p style={style1}>Additional information</p></label>
            <textarea
              type="text"
              placeholder="Additional information of house"
              ref={addInfoRef}
            ></textarea>

            <div className="buttons">
              <button className="btn save" type="submit">
                Save Updates
              </button>
              <button className="btn delete" onClick={handleDelete}>
                Delete Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ListingModal;
