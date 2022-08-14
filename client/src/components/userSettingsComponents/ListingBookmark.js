import React, { useState, useEffect } from "react";
import axios from "axios";

// using user context
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";
import { usePresence, AnimatePresence, motion } from "framer-motion";

const ListingBookmark = (props) => {
  const [bookMark, setBookMarked] = useState(true);
  const [userProfileDetails, setUserProfileDetails] = useState({});
  const [fidEntries, setFidEntries] = useState([]);
  const { currentUser } = useAuth();
  const { deleteUserBookmark } = useUser();
  const [listingDeleted, setListingDeleted] = useState(false);
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    !isPresent && setTimeout(safeToRemove, 1000);
  }, [isPresent]);

  const bookmarkVariant = {
    initial: {
      opacity: 0,
      y: "100vh",
    },
    animate: {
      opacity: 1,
      y: "0",
      transition: {
        delay: 0.7,
        type: "spring",
        stiffness: 160,
        duration: 1,
      },
    },
    exit: {
      x: "100vw",
      opacity: 0,
      transition: {
        delay: 0.5,
        duration: 1,
      },
    },
  };

  //display bookmarked flats recorded from firebase
  useEffect(() => {
    const getAllBookmarks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/api/users/get-all-bookmarks?uid=${currentUser.uid}`
        );
        console.log(response.data);
        const flatIdObject = response.data;
        const keyEntries = Object.keys(flatIdObject);
        const fidList = [];
        for (var i = 0; i < keyEntries.length; i++) {
          fidList.push(flatIdObject[keyEntries[i]].fid);
        }
        setFidEntries(fidList);
      } catch (err) {
        console.log(err);
      }
    };
    getAllBookmarks();
  }, [currentUser.uid]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3005/api/users/get-user-profile?uid=${currentUser.uid}`
        );
        setUserProfileDetails(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [currentUser.uid]);

  const {
    town,
    block,
    street,
    resalePrice,
    unitNo,
    fid,
    flatType,
    sft,
    remainingLease,
    addInfo,
    uid,
    imageLinks,
  } = props.listedFlat;

  const deleteBookmark = (fidKey) => {
    setBookMarked(false);
    const userid = currentUser.uid;
    deleteUserBookmark(userid, fidKey);
    setListingDeleted(true);
  };

  return (
    <>
      {bookMark ? (
        <>
          <motion.div
            variants={bookmarkVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            className="listing"
          >
            <motion.div>
              <button
                type="submit"
                onClick={() => {
                  deleteBookmark(props.bookmarkKey);
                }}
                className="delete-bookmark btn"
              >
                Remove Bookmark
              </button>
              {imageLinks &&
                Object.keys(imageLinks).map((key) => {
                  return (
                    <div
                      key={key}
                      className="listing-banner-image"
                      style={{
                        backgroundImage: `url(${imageLinks[key].imageUrl})`,
                      }}
                    ></div>
                  );
                })}
              <div className="listing-information">
                <div>
                  <h4>{block + " " + street}</h4>
                  <h5>
                    <span>S$</span>
                    {resalePrice}
                  </h5>
                  <div>{flatType} Flat</div>
                  <div>Remaining lease time {remainingLease}</div>
                  <div style={{ fontWeight: "500" }}>{addInfo}</div>
                </div>
                <div className="listed-by">
                  <div className="profileIcon"></div>
                  <div className="user-contact-info">
                    <p>
                      Listed by{" "}
                      {userProfileDetails &&
                        userProfileDetails.firstName +
                          " " +
                          userProfileDetails.lastName}
                      {userProfileDetails &&
                        (userProfileDetails.firstName === "" ||
                          userProfileDetails.lastName === "") &&
                        userProfileDetails.username}
                    </p>
                    <p>
                      Contact via whatsapp @{" "}
                      {userProfileDetails &&
                        (userProfileDetails.contactNum === ""
                          ? "-"
                          : userProfileDetails.contactNum)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ListingBookmark;
