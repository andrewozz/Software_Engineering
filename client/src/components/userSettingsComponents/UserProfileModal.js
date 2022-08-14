import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../../styles/userProfileStyles/userProfileModal.modules.css";

import { IconContext } from "react-icons/lib";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Card } from "react-bootstrap";

function UserProfileModal(props) {
  const modalVariants = {
    animate: {
      rotateZ: 0,
      rotateY: 0,
      opacity: 1,
      transition: {
        type: "spring",
        ease: "easeInOut",
        duration: 1.2,
      },
    },
    initial: {
      rotateZ: -160,
      rotateY: -150,
      opacity: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.8,
      },
    },
  };
  const userProfileDetails = props.profileDetails;
  // console.table(userProfileDetails);
  return (
    <>
      <motion.div
        className="user-profile-modal"
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="initial"
      >
        <Card className="user-profile-modal-card">
          <Card.Body>
            <div className="profile-close-icon">
              <IconContext.Provider value={{ color: "white", size: "30px" }}>
                <span onClick={() => props.toggled(false)}>
                  <AiOutlineCloseCircle />
                </span>
              </IconContext.Provider>
            </div>
            <section className="user-profile-modal-sect">
              <div>
                <img
                  src={userProfileDetails.profilePicLink}
                  className="profile-modal-img"
                />
              </div>
              <section className="user-profile-modal-list-info">
                <div>
                  <h2>
                    {userProfileDetails.firstName} {userProfileDetails.lastName}
                  </h2>
                </div>
                <div className="user-profile-info-grid">
                  <div className="user-profile-info-grid-1">Username:</div>
                  <div className="user-profile-info-grid-2">
                    {userProfileDetails.username}
                  </div>
                </div>
                <div className="user-profile-info-grid">
                  <div className="user-profile-info-grid-1">Age:</div>
                  <div className="user-profile-info-grid-2">
                    {userProfileDetails.age}
                  </div>
                </div>
                <div className="user-profile-info-grid">
                  <div className="user-profile-info-grid-1">
                    Contact Number:
                  </div>
                  <div className="user-profile-info-grid-2">
                    <a href={`tel${userProfileDetails.contactNum}`}>
                      {userProfileDetails.contactNum}
                    </a>
                  </div>
                </div>
                <div className="user-profile-info-grid">
                  <div className="user-profile-info-grid-1">
                    Contact Number:
                  </div>
                  <div className="user-profile-info-grid-2">
                    <a href={`mailto:${userProfileDetails.email}`}>
                      {userProfileDetails.email}
                    </a>
                  </div>
                </div>
                <div className="user-profile-info-grid">
                  <div className="user-profile-info-grid-1">Company:</div>
                  <div className="user-profile-info-grid-2">
                    {userProfileDetails.cName === ""
                      ? "-"
                      : userProfileDetails.cName}
                  </div>
                </div>
                <div className="user-profile-info-grid-r">
                  <div className="user-profile-info-grid-r-1">Description:</div>
                  <div className="user-profile-info-grid-r-2">
                    {userProfileDetails.description === ""
                      ? "-"
                      : userProfileDetails.description}
                  </div>
                </div>
              </section>
            </section>
          </Card.Body>
        </Card>
      </motion.div>
    </>
  );
}

export default UserProfileModal;
