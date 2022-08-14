import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { useAuth } from "../../context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import UserProfileModal from "./UserProfileModal";
const UserBanner = () => {
  const { currentUser } = useAuth();
  const { bannerUpdate, userProfileInfo, setUserProfileInfo } = useUser();
  const [userProfileDetails, setUserProfileDetails] = useState({});
  const [profilePicLink, setProfilePicLink] = useState(null);
  const [showFullProfile, setShowFullProfile] = useState(false);
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3005/api/users/get-user-profile?uid=${currentUser.uid}`
        );
        const data = res.data;
        setUserProfileDetails(data);
        setUserProfileInfo(data);
      } catch (err) {
        console.log(err);
      }
    };
    const sleep = async (t) => await new Promise((r) => setTimeout(r, t));
    sleep(1200);
    getUserProfile();
  }, [bannerUpdate, currentUser.uid]);
  useEffect(() => {
    const userProfileImgObj = userProfileDetails["imageLinks"];
    if (userProfileImgObj !== null && userProfileImgObj !== undefined) {
      const profileImageKeys = Object.keys(userProfileImgObj);
      const profileImageKeysSorted = [...profileImageKeys.sort()];
      const imageKey =
        profileImageKeysSorted[profileImageKeysSorted.length - 1];
      const imageURL = userProfileImgObj[imageKey].imageUrl;
      setProfilePicLink(imageURL);
    }
  }, [currentUser.uid, userProfileDetails]);
  return (
    <>
      <div className="user-banner">
        <motion.div
          onClick={() => setShowFullProfile(true)}
          className="user-banner-sidemodal"
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "easeIn", duration: 1.2 }}
        >
          {profilePicLink && (
            <img src={profilePicLink} className="profile-picture" />
          )}
          <h4 className="user-banner-sidemodal-name">
            {userProfileDetails.firstName !== null
              ? userProfileDetails.firstName
              : "-"}
          </h4>
          <p className="user-banner-sidemodal-username">@{userProfileDetails.username}</p>
          <p className="user-banner-sidemodal-email">
            {userProfileDetails.email}
          </p>
        </motion.div>
      </div>
      {console.log(showFullProfile)}
      <AnimatePresence>
        {showFullProfile && (
          <UserProfileModal
            toggleState={showFullProfile}
            toggled={setShowFullProfile}
            profileDetails={{ ...userProfileDetails, profilePicLink }}
          />
        )}
      </AnimatePresence>
    </>
  );
};
export default UserBanner;
