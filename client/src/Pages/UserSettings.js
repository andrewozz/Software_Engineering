import React, { useState } from "react";
import ProfileInformation from "../components/userSettingsComponents/ProfileInformation";
import UserBanner from "../components/userSettingsComponents/UserBanner";
import UserBookmarks from "../components/userSettingsComponents/UserBookmarks";
import UserListings from "../components/userSettingsComponents/UserListings";
import { motion } from "framer-motion";
const UserSettings = () => {
  // const [profileTaskBar, setProfileTaskBar] = useState(true);
  // const [userListingsTaskBar, setUSerListingsTaskBar] = useState(false);
  // const [userBookmarksTaskBar, setUserBookmarksTaskBar] = useState(false);

  const [activeTaskBar, setActiveTaskBar] = useState([true, false, false]); // profile,listings,bookmarks in order

  const changeActiveTaskBar = (index) => {
    var active = [false, false, false];
    active[index] = true;
    setActiveTaskBar(active);
  };
  return (
    <motion.div>
      <UserBanner />
      <motion.div
        className="user-details"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "easeOut", duration: 1.2 }}
      >
        <div className="taskbar-container">
          <div className="taskbar">
            <div
              className={
                activeTaskBar[0]
                  ? "taskbar-profileInfo taskbar-tab active"
                  : "taskbar-profileInfo taskbar-tab"
              }
              onClick={() => changeActiveTaskBar(0)}
            >
              Profile Info
            </div>
            <div
              className={
                activeTaskBar[1]
                  ? "taskbar-profileInfo taskbar-tab active"
                  : "taskbar-profileInfo taskbar-tab"
              }
              onClick={() => changeActiveTaskBar(1)}
            >
              Listings
            </div>
            <div
              className={
                activeTaskBar[2]
                  ? "taskbar-profileInfo taskbar-tab active"
                  : "taskbar-profileInfo taskbar-tab"
              }
              onClick={() => changeActiveTaskBar(2)}
            >
              Bookmarks
            </div>
          </div>
        </div>
        {activeTaskBar[0] ? <ProfileInformation /> : <></>}
        {activeTaskBar[1] ? <UserListings /> : <></>}
        {activeTaskBar[2] ? <UserBookmarks /> : <></>}
      </motion.div>
    </motion.div>
  );
};

export default UserSettings;
