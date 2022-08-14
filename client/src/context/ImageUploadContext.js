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

const ImageContext = React.createContext();
export const useImage = () => useContext(ImageContext);
export const ImageProvider = ({ children }) => {
  const [loading] = useState(false);
  /*
  1. Set a folder for the images in firebase (as a ref)
  2. Iterate though the list of file objects
  3. Extract the name, and the last modification time, these
     are fields that reside in a File object
  4. Split filename from the format (seperated by .)
  5. Concat file name and last modification time
  6. Do a sha256 hash on 5.
  7. then append the image format back to form a whole string
  8. Add this to the ref
  9. Submit the image to firebase storage and generate a download url
  10. On generate download url, need to locate the flat via the fid
  11. This is done by ordering flats by key (key is inserted based off the time inserted into database)
  12. However we also need to factor in other users uploading at the same time as us or at a 
  extremely short time span before/ after the current user upload, this means by simply indexing the latest flat, there is a probability of indexing the wrong user's flat. And saving the wrong image
  to their listing
  12. Instead of going through the list from the start, check the list from the end of the array
  13. Other users may upload listings at the same time, but the probability of indexing out the
  fid of the current user's listing is greater especially when number of listings extends to a large number
  14. When fid located, save the url to the flat (if snapshot.exist()=> call set, else call update)

  */
  const uploadFlatImage = (fid, fileStateArr) => {
    for (const fileToUpload of fileStateArr) {
      const storage = getStorage();
      // console.log(fileToUpload);
      // console.log(`fileToUploadName: ${fileToUpload["name"]}`);
      const [fileNameWithoutFormat, formatOfFile] =
        fileToUpload["name"].split(".");
      // console.log(
      //   `FileName without format: ${fileNameWithoutFormat} Format: ${formatOfFile}`
      // );
      const fileLastModified = fileToUpload["lastModified"];
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
      const storageRef = ref(storage, "flatImages/" + hashedFNameWithFormat);
      // console.log(storageRef);
      const uploadTask = uploadBytesResumable(storageRef, fileToUpload);
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
            const dbImageRef = rRef(rtimeDb, `flats/${fid}/imageLinks`);
            const dbImagePushRef = push(dbImageRef);
            get(dbImagePushRef).then((snapshot) => {
              if (snapshot.exists()) {
                update(dbImagePushRef, imageURLObject)
                  .then(() => {
                    // console.log("Update image link sucess");
                  })
                  .catch((err) => {
                    // console.log("Update image link failed!");
                    // console.log(err);
                  });
              } else {
                set(dbImagePushRef, imageURLObject)
                  .then(() => {
                    // console.log("Added image link to database!");
                  })
                  .catch((err) => {
                    // console.log("Image set link failed");
                    // console.log(err);
                  });
              }
            });
          });
        }
      );
    }
  };
  const values = { uploadFlatImage };

  return (
    <ImageContext.Provider value={values}>
      {!loading && children}
    </ImageContext.Provider>
  );
};
