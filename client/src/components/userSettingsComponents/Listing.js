import React, { useState, useEffect, useReducer } from "react";
import ListingModal from "./ListingModal";
import axios from "axios";
import { useFlatsListing } from "../../context/FlatsListingContext";
import { useLocation } from "react-router-dom";
import { BsBookmarksFill } from "react-icons/bs";
import { BsBookmarks } from "react-icons/bs";
import ContactSeller from "./ContactSeller";

// using user context
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";

import { motion } from "framer-motion";
const Listing = (props) => {
  //useStates for modal toggling
  const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const [bookMark, setBookMarked] = useState(false);
  const { flatSelectedId, setFlatSelectedId } = useFlatsListing();
  const [userProfileDetails, setUserProfileDetails] = useState({});
  const [fidEntries, setFidEntries] = useState([]);
  const { currentUser } = useAuth();
  const { addUserBookmark, deleteUserBookmark } = useUser();
  const [listingDelete, setListingDeleted] = useState(false);
  const [contactModal, setContactModal] = useState(false);

  //display bookmarked flats recorded from firebase
  useEffect(() => {
    axios
      .get(
        `http://localhost:3005/api/users/get-all-bookmarks?uid=${currentUser.uid}`
      )
      .then((response) => {
        // console.log(response.data)
        const flatIdObject = response.data;
        let keyEntries;
        if (flatIdObject !== null && flatIdObject !== undefined) {
          keyEntries = [...Object.keys(flatIdObject)];
          const fidList = [];
          for (var i = 0; i < keyEntries.length; i++) {
            fidList.push(flatIdObject[keyEntries[i]].fid);
          }
          setFidEntries(fidList);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  useEffect(() => {
    const fetchPost = async () => {
      axios
        .get(`http://localhost:3005/api/users/get-user-profile?uid=${uid}`)
        .then((res) => {
          setUserProfileDetails(res.data);
        });
    };
    fetchPost();
  }, []);

  // console.log("Start");
  // console.log(imageLinks);
  // console.log("end");

  const bookmarkListing = () => {
    setBookMarked(true);
    const userid = currentUser.uid;
    addUserBookmark(userid, props.listedFlat.fid);
  };

  const deleteBookmark = (fidKey) => {
    setBookMarked(false);
    const userid = currentUser.uid;
    deleteUserBookmark(userid, fidKey);
    setListingDeleted(true);
  };
  return (
    <>
      <motion.section
        className="listing"
        initial={{ x: "-100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 135,
          duration: 1,
          delay: 1,
        }}
      >
        <div
          style={listingDelete ? { display: "none" } : {}}
          onClick={() => {
            if (location.pathname !== "/explore") {
              setToggle(true);
              setFlatSelectedId(fid);
            }
          }}
        >
          {props.isUnderBookmark ? (
            <button
              type="submit"
              onClick={() => {
                deleteBookmark(props.bookmarkKey);
              }}
              className="delete-bookmark btn"
            >
              Delete
            </button>
          ) : (
            <></>
          )}
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

          <div className="listing-bookmark" onClick={() => bookmarkListing()}>
            {!props.bookmark ? (
              <></>
            ) : fidEntries.includes(fid) || bookMark ? (
              <BsBookmarksFill />
            ) : (
              <BsBookmarks />
            )}
          </div>
          {/* <div className="listing-banner-image"></div> */}
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
              <motion.div
                className="user-contact-info"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <p>
                  Listed by{" "}
                  {userProfileDetails &&
                    userProfileDetails.firstName +
                      " " +
                      userProfileDetails.lastName}
                  {userProfileDetails &&
                    (userProfileDetails.firstName === "" ||
                      userProfileDetails.lastName == "") &&
                    userProfileDetails.username}
                </p>
                {/* <p>
                  Contact via whatsapp @{" "}
                  {userProfileDetails &&
                    (userProfileDetails.contactNum === ""
                      ? "-"
                      : userProfileDetails.contactNum)}
                </p> */}
                <button
                  className="btn submit-btn"
                  onClick={() => setContactModal(true)}
                  style={{ width: "100%", height: "45px", marginTop: "10px" }}
                >
                  Contact Seller
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Listing Modal here to update/delete/add listing */}
      {location.pathname !== "/explore" && toggle && (
        <ListingModal closeModalFunction={setToggle} />
      )}

      {/* Contact Modal when clicked upon */}
      {contactModal ? (
        <ContactSeller
          sellerEmail={userProfileDetails.email}
          setContactModal={setContactModal}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Listing;
