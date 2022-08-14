import React, { useState, useContext } from "react";

import { sha256 } from "js-sha256";
import {
  getDatabase,
  set,
  ref as rRef,
  push,
  get,
  update,
} from "firebase/database";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const ProfileImageContext = React.createContext();
export const useProfileImage = () => useContext(ProfileImageContext);
export const ProfileImageProvider = ({ children }) => {
  const [loading] = useState(false);
  const uploadProfileImage = (uid, profileImageFile) => {
    const storage = getStorage();
    // console.log(profileImageFile);
    // console.log(`fileToUploadName: ${profileImageFile["name"]}`);
    const [fileNameWithoutFormat, formatOfFile] =
      profileImageFile["name"].split(".");
    // console.log(
    //   `FileName without format: ${fileNameWithoutFormat} Format: ${formatOfFile}`
    // );
    const fileLastModified = profileImageFile["lastModified"];
    const fileNameAndLastMod = fileNameWithoutFormat.concat(
      "_",
      fileLastModified
    );
    // console.log(`fileNameAndLastMod: ${fileNameAndLastMod}`);
    let hash = sha256.create();
    hash.update(fileNameAndLastMod);
    const hashedFNameForStorage = hash.hex();
    // console.log(`Hash file output: ${hashedFNameForStorage}`);
    const hashedFNameWithFormat = hashedFNameForStorage.concat(
      ".",
      formatOfFile
    );
    // console.log(`Hash file with format output: ${hashedFNameWithFormat}`);
    // console.log("flatsImages/" + hashedFNameWithFormat);
    // console.log(storage);
    const storageRef = ref(
      storage,
      `profilePicture/${uid}/${hashedFNameWithFormat}`
    );
    // console.log(storageRef);
    const uploadTask = uploadBytesResumable(storageRef, profileImageFile);
    // console.log(uploadTask);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            // console.log("Upload is paused");
            break;
          case "running":
            // console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // console.log("Unauthorized user");
            break;
          case "storage/canceled":
            // User canceled the upload
            // console.log("User cancelled the upload");
            break;
          case "storage/unknown":
            // console.log("unknown error");
            break;
          default:
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          const imageURLObject = {
            imageUrl: downloadURL,
          };
          const rtimeDb = getDatabase();
          const dbImageRef = rRef(rtimeDb, `users/${uid}/imageLinks`);
          const dbImagePushRef = push(dbImageRef);
          get(dbImagePushRef).then((snapshot) => {
            if (snapshot.exists()) {
              update(dbImagePushRef, imageURLObject)
                .then(() => {
                  console.log("Update dp Image link sucess");
                })
                .catch((err) => {
                  // console.log("Update image link failed!");
                  console.log(err);
                });
            } else {
              set(dbImagePushRef, imageURLObject)
                .then(() => {
                  // console.log("Added image link to database!");
                })
                .catch((err) => {
                  // console.log("Image set link failed");
                  console.log(err);
                });
            }
          });
          const isVerifiedRef = rRef(rtimeDb, `users/${uid}/isVerified`);
          update(isVerifiedRef, { isVerified: true }).then(() => {
            console.log("update success");
          });
        });
      }
    );
  };
  const values = { uploadProfileImage };

  return (
    <ProfileImageContext.Provider value={values}>
      {!loading && children}
    </ProfileImageContext.Provider>
  );
};
