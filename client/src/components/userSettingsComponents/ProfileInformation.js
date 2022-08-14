import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";
import { useProfileImage } from "../../context/ProfilePictureContext";
import { failedAlert, infoAlert } from "../../helpers/sweetalerthelper";
import * as faceapi from "face-api.js";
import "../../styles/userProfileStyles/imageRecognition.modules.css";
import "../../styles/userProfileStyles/profilePicture.modules.css";
//Facial Recognition model import
import { successAlert } from "../../helpers/sweetalerthelper";
import { motion } from "framer-motion";
const ProfileInformation = (props) => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const cNameRef = useRef();
  const ageRef = useRef();
  const descRef = useRef();
  const contactRef = useRef();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { updateUserProfile, setBannerUpdate, bannerUpdate } = useUser();
  const { uploadProfileImage } = useProfileImage();
  const imgPreviewRef = useRef();
  const canvasRef = useRef();
  const style1 = {
    lineHeight: "0.3",
    fontSize: "18px",
    textAlign: "start",
  };
  const [selectedFile, setSelectedFile] = useState();
  const [profPicUpload, setProfPicUpload] = useState();
  const [preview, setPreview] = useState();
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const handleSelectedFile = (e) => {
    e.preventDefault();
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };
  const [userProfileDetails, setUserProfileDetails] = useState({});
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3005/api/users/get-user-profile?uid=${currentUser.uid}`
        );
        const data = res.data;
        setUserProfileDetails(data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserProfile();
  }, [currentUser.uid]);

  // Facial Recognition useEffect
  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
        await faceapi.nets.faceExpressionNet.loadFromUri("/models");
        await handleImage();
      } catch (err) {
        console.log(err);
      }
    };
    imgPreviewRef.current && loadModels();
  }, [selectedFile]);
  const handleImage = async () => {
    const detections = await faceapi
      .detectAllFaces(
        imgPreviewRef.current,
        new faceapi.TinyFaceDetectorOptions()
      )
      .withFaceLandmarks()
      .withFaceExpressions();
    if (detections.length === 0) {
      setProfPicUpload(null);
      failedAlert(
        "Wrong Image Entered",
        "You did not enter an image with your face. Please try again"
      );
    } else if (
      detections[0]["expressions"].sad > 0.5 &&
      detections[0]["neutral"].sad > 0.4
    ) {
      setProfPicUpload(null);
      infoAlert(
        "Sad face detected",
        "Our facial recognition system detects that your expression is sad. Try to smile!"
      );
    } else if (detections[0]["expressions"].angry > 0.7) {
      setProfPicUpload(null);
      infoAlert(
        "Angry face detected!",
        "Our facial recognition system detects that your expression is angry. Try to smile!"
      );
    } else {
      setProfPicUpload(selectedFile);
    }

    console.log(detections);
    canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
      imgPreviewRef.current
    );
    faceapi.matchDimensions(canvasRef.current, {
      width: 250,
      height: 250,
    });
    const resized = faceapi.resizeResults(detections, {
      width: 250,
      height: 250,
    });
    faceapi.draw.drawDetections(canvasRef.current, resized);
    faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
    faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateUserObj = {
      uid: currentUser.uid,
      firstName:
        firstNameRef.current.value === null ? "" : firstNameRef.current.value,
      lastName:
        lastNameRef.current.value === null ? "" : lastNameRef.current.value,
      username:
        usernameRef.current.value === null ? "" : usernameRef.current.value,
      age: ageRef.current.value === null ? "" : ageRef.current.value,
      cName: cNameRef.current.value === null ? "" : cNameRef.current.value,
      contactNum:
        contactRef.current.value === null ? "" : contactRef.current.value,
      description: descRef.current.value === null ? "" : descRef.current.value,
    };
    if (profPicUpload === null) {
      failedAlert(
        "No profile image added!",
        "No valid profile picture uploaded, please add a proper profile picture before proceeding"
      );
    } else {
      updateUserProfile(updateUserObj);
      uploadProfileImage(currentUser.uid, profPicUpload);
      await new Promise((r) => setTimeout(r, 1000));
      successAlert(
        "Profile Updated!",
        "Profile has been updated! You can proceed to view it"
      );
      setBannerUpdate(!bannerUpdate);
      navigate("/settings");
    }
  };
  return (
    <div className="container">
      <motion.form
        className="profile-info card"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, x: "100vw" }}
        animate={{ opacity: 1, x: "0" }}
        transition={{
          type: "spring",
          stiffness: 150,
          delay: 1,
          duration: 1.2,
        }}
      >
        <h4 style={{ marginBottom: "30px" }}>
          Update User Profile Information
        </h4>
        <label>
          <p style={style1}>First Name</p>
        </label>
        <input
          style={{ marginBottom: "20px" }}
          type="text"
          required
          ref={firstNameRef}
          placeholder="First Name"
          defaultValue={
            userProfileDetails.firstName !== ""
              ? userProfileDetails.firstName
              : null
          }
        ></input>
        <label>
          <p style={style1}>Last Name</p>
        </label>
        <input
          style={{ marginBottom: "20px" }}
          type="text"
          required
          ref={lastNameRef}
          placeholder="Last Name"
          defaultValue={
            userProfileDetails.lastName !== ""
              ? userProfileDetails.lastName
              : null
          }
        ></input>
        <label>
          <p style={style1}>Username</p>
        </label>
        <input
          style={{ marginBottom: "20px" }}
          type="text"
          required
          ref={usernameRef}
          placeholder="UserName"
          defaultValue={
            userProfileDetails.username !== ""
              ? userProfileDetails.username
              : null
          }
        ></input>
        <label>
          <p style={style1}>Age</p>
        </label>
        <input
          style={{ marginBottom: "20px" }}
          type="text"
          required
          min={22}
          max={99}
          ref={ageRef}
          placeholder="Age"
          defaultValue={
            userProfileDetails.age !== "" ? userProfileDetails.age : null
          }
        ></input>
        <label>
          <p style={style1}>Company</p>
        </label>
        <input
          style={{ marginBottom: "20px" }}
          type="text"
          ref={cNameRef}
          placeholder="Company"
          defaultValue={
            userProfileDetails.cName !== "" ? userProfileDetails.cName : null
          }
        ></input>
        <label>
          <p style={style1}>Contact Number</p>
        </label>
        <input
          style={{ marginBottom: "20px" }}
          type="text"
          ref={contactRef}
          minLength={8}
          maxLength={8}
          placeholder="contact number"
          defaultValue={
            userProfileDetails.contactNum !== ""
              ? userProfileDetails.contactNum
              : null
          }
        ></input>
        <textarea
          ref={descRef}
          maxLength={300}
          placeholder="Description of yourself!"
          type="text"
          style={{ marginBottom: "20px" }}
          defaultValue={
            userProfileDetails.description !== ""
              ? userProfileDetails.description
              : null
          }
        ></textarea>
        <div>
          <label>
            <p style={style1}>Profile Picture</p>
          </label>
          <input
            style={{ marginBottom: "20px", width: "100%" }}
            type="file"
            onChange={handleSelectedFile}
          ></input>
          {selectedFile && (
            <div className="img-canvas-div">
              <img
                crossOrigin="anonymous"
                id="profile-pics"
                ref={imgPreviewRef}
                src={preview}
              />
              <canvas id="profile-pics-canvas" ref={canvasRef} />
            </div>
          )}
        </div>
        <button type="submit" className="btn">
          Save
        </button>
      </motion.form>
    </div>
  );
};

export default ProfileInformation;
