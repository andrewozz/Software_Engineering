import React, { useState, useEffect } from "react";

import axios from "axios";
import Listing from "./Listing";
import ListingAdd from "./ListingAdd";
import { useAuth } from "../../context/AuthContext";
import { useFlatsListing } from "../../context/FlatsListingContext";
import { AnimatePresence } from "framer-motion";
const UserListings = () => {
  //user listings info passed here from firebase
  const [listedFlats, setListedFlats] = useState({});
  const [flatKeys, setFlatsKeys] = useState([]);
  const [listingBtnShow, setListingBtnShow] = useState(false);
  const { currentUser } = useAuth();
  const { flatListedState, dflatListedState } = useFlatsListing();
  // const { isUploadFinish, setIsUploadFinish } = useImage();
  // console.log(`Flats listed state= ${flatListedState}`);
  // console.log(`dFlats listed state= ${dflatListedState}`);

  useEffect(() => {
    const sleep = async (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };
    const fetchUserListedFlats = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3005/api/list-flats/get-user-listed-flats?uid=${currentUser.uid}`
        );
        const resData = res.data;
        console.table(resData);
        if (resData !== null) {
          setFlatsKeys(Object.keys(res.data));
        }
        setListedFlats(resData);
        setListingBtnShow(true);
      } catch (err) {
        console.log(err);
      }
    };
    sleep(500);
    fetchUserListedFlats();
  }, [flatListedState, dflatListedState, currentUser.uid]);

  if (listedFlats) {
    return (
      <div className="listings">
        {flatKeys.map((key) => {
          return (
            <AnimatePresence layout>
              <Listing
                bookmark={false}
                key={key}
                listedFlat={{ ...listedFlats[key], fid: key }}
              />
            </AnimatePresence>
          );
        })}
        {/* Put the button as a component of its own for code readability */}
        {listingBtnShow && <ListingAdd />}
      </div>
    );
  } else {
    return <div className="listings">{listingBtnShow && <ListingAdd />}</div>;
  }
};

export default UserListings;
