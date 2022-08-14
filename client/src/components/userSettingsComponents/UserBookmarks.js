import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import ListingBookmark from "./ListingBookmark";
import { AnimatePresence, MotionConfig } from "framer-motion";

import { motion } from "framer-motion";
const UserBookmarks = () => {
  const { currentUser } = useAuth();
  const [allFlatInfo, setAllFlatInfo] = useState([]);
  const [flatkeys, setFlatKeys] = useState([]);

  //call axios to fetch all bookmarks from firebase db
  useEffect(() => {
    const getBookmarks = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3005/api/users/get-all-bookmarks?uid=${currentUser.uid}`
        );
        const flatIdObject = res.data;
        await obtainBookMarkedFlats(flatIdObject);
      } catch (err) {
        console.log(err);
      }
    };
    getBookmarks();
  }, [currentUser.uid]);

  const obtainBookMarkedFlats = async (flatIdObject) => {
    try {
      const res = await axios.get(
        "http://localhost:3005/api/list-flats/get-bookmarked-flats",
        {
          params: flatIdObject,
        }
      );
      const keys = Object.keys(res.data);
      setFlatKeys(keys);
      const flatInfo = [];
      for (var i = 0; i < keys.length; i++) {
        flatInfo.push(res.data[keys[i]]);
      }
      setAllFlatInfo(flatInfo);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="user-bookmarks">
      {/* {console.log(flatkeys)} */}
      {allFlatInfo.map((flat, index) => {
        return (
          <AnimatePresence>
            <ListingBookmark
              key={index}
              bookmarkKey={flatkeys[index]}
              listedFlat={flat}
            />
          </AnimatePresence>
        );
      })}
    </div>
  );
};

export default UserBookmarks;
