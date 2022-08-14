import React, { useContext, useState } from "react";

import axios from "axios";

const UserContext = React.createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [loading] = useState(false);
  const [bannerUpdate, setBannerUpdate] = useState(0);
  const [bookmarkUpdate, setbookmarkUpdate] = useState(0);
  const [userProfileInfo, setUserProfileInfo] = useState({});
  const writeUserOnAuth = (userObj) => {
    axios
      .post("http://localhost:3005/api/users/create-user", userObj)
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateUserProfile = (updateUserObj) => {
    axios
      .put("http://localhost:3005/api/users/update-profile", updateUserObj)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addUserBookmark = (uid, fid) => {
    axios
      .put("http://localhost:3005/api/users/add-bookmark", {
        uid: uid,
        fid: fid,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const deleteUserBookmark = (uid, fid) => {
    axios
      .delete("http://localhost:3005/api/users/delete-bookmark", {
        //pass in input field variables here
        params: {
          uid: uid,
          fid: fid,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const value = {
    writeUserOnAuth,
    updateUserProfile,
    bannerUpdate,
    setBannerUpdate,
    addUserBookmark,
    deleteUserBookmark,
    bookmarkUpdate,
    setbookmarkUpdate,
    userProfileInfo,
    setUserProfileInfo,
  };
  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};
