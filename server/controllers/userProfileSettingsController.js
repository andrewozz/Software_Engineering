const db = require("../db");
const {
  getDatabase,
  ref,
  update,
  child,
  set,
  get,
  push,
  remove,
} = require("firebase/database");
const rtimeDb = getDatabase();
const writeUserOnAuth = (req, res) => {
  console.log(req.body);
  const { uid, username, email, dateJoined } = req.body;
  if (uid === "" || uid == undefined) {
    throw new Error("Empty uid input revert!");
  }
  if (username === "" || username == undefined) {
    throw new Error("Empty username input revert!");
  }
  if (email === "" || email == undefined) {
    throw new Error("Empty email input revert!");
  }
  if (dateJoined === "" || dateJoined == undefined) {
    throw new Error("Empty dateJoined input revert!");
  }

  const userRef = ref(rtimeDb, "users/" + uid);
  const userSetObj = {
    username: username,
    email: email,
    dateJoined: dateJoined,
    firstName: "",
    lastName: "",
    age: "",
    cName: "",
    contactNum: "",
    description: "",
    isVerified: false,
  };

  // console.table(userSetObj);
  try {
    set(userRef, userSetObj)
      .then(() => {
        res.status(200).json({ message: "Success!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  } catch (err) {
    res.status(400).json(err);
  }
};

const readUserProfile = (req, res) => {
  // console.log(req.query)
  const { uid } = req.query;
  // console.table(uid);
  if (uid === undefined || uid === "") {
    console.log("Empty input");
    throw new Error("Empty inputs revert!");
  }

  const userDbRef = ref(rtimeDb);
  get(child(userDbRef, "users/" + uid))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // console.table(snapshot.val());
        res.status(200).json(snapshot);
      } else {
        console.log("No data available");
        res.status(400).json({ message: "No data available" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

const updateUserProfile = (req, res) => {
  const {
    uid,
    firstName,
    lastName,
    username,
    age,
    cName,
    contactNum,
    description,
  } = req.body;
  // console.table(req.body);
  if (age < 22 || description.length > 300) {
    throw new Error("Invalid input!");
  }
  if (uid === "" || uid === undefined) {
    console.log("Empty uid!");
    throw new Error("Empty uid revert!");
  }
  const updatedData = {
    firstName: firstName === undefined || firstName === "" ? "" : firstName,
    lastName: lastName === null || lastName === "" ? "" : lastName,
    username: username === null || username === "" ? "" : username,
    age: age === null || age === "" ? "" : age,
    cName: cName === undefined || cName === "" ? "" : cName,
    contactNum: contactNum === undefined || contactNum === "" ? "" : contactNum,
    description: description === null ? "" : description,
  };
  const userRef = ref(rtimeDb, "users/" + uid);
  update(userRef, updatedData)
    .then(() => res.status(200).json({ message: "successfully updated!" }))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

// Adds the flatid of the bookmarked flat to firebase db under /users/:uid/bookmarks
const addBookMark = (req, res) => {
  const { uid, fid } = req.body;
  console.log("PRINTING UID AND FID upon bookmarking of a listing");
  // console.table(req.body);
  const userUpdateRef = ref(rtimeDb, "users/" + uid + "/bookmarks/");
  const userUpdatePushRef = push(userUpdateRef);
  const updateObj = {
    fid: fid,
  };
  get(userUpdateRef).then((snapshot) => {
    if (snapshot.exists()) {
      /* 
      If user has made bookmarks before:

            1. Check if the current bookmarked flat is a duplicate flag
            2. If true => flag err
            3. Else => proceed to add to list of existing bookmarks
      */
      const prevBookMarks = snapshot.val();
      console.log(prevBookMarks);
      for (const prevBMark in prevBookMarks)
        if (prevBookMarks[prevBMark].fid === fid) {
          res.status(400).json({ message: "Duplicated bookmark!" });
          return;
        }
      update(userUpdatePushRef, updateObj)
        .then(() => {
          console.log("success");
          res.status(200).json({ message: "Bookmarks update success!" });
        })
        .catch((err) => {
          console.log("Update failed!");
          res.status(400).json(err);
        });
    } else {
      /*    
      A case where this is the user's first bookmark OR user does not have any bookmarks in this moment
      User not having bookmarks can have 2 reasons:

          1. Have not made a bookmark before
          2. Made bookmarks before but deleted all of them
      */
      set(userUpdatePushRef, updateObj)
        .then(() => {
          console.log("set success");
          res.status(200).json({ message: "New bookmark added!!" });
        })
        .catch((err) => {
          console.log("set failed");
          res.status(400).json(err);
        });
    }
  });
};

const getAllBookmarks = async (req, res) => {
  const { uid } = req.query; //user id
  const userBookmarksRef = ref(rtimeDb, "users/" + uid + "/bookmarks/");
  //obtain list of flat ids
  get(userBookmarksRef).then((snapshot) => {
    const dict = snapshot.val();
    if (snapshot.exists()) {
      res.status(200).json(dict);
    } else {
      res.status(200).json(dict);
    }
  });
};

const deleteBookMark = (req, res) => {
  console.log("hello world");
  console.log(req.query);
  const uid = req.query.uid;
  const fid = req.query.fid;
  //  firebase method to delete bookmark from user's saved bookmarks
  const userBookmarksRef = ref(rtimeDb, "users/" + uid + "/bookmarks");
  get(userBookmarksRef).then((snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach((snap) => {
        if (fid === snap.val().fid) {
          const fidref = ref(
            rtimeDb,
            "users/" + uid + `/bookmarks/${snap.key}`
          );
          remove(fidref).then(() => {
            console.log("delete success");
            res.status(200).json({ message: "Deletion of bookmark success!!" });
          });
        }
      });
    } else {
      res.status(400).json({ message: "No such bookmark" });
    }
  });
};

module.exports = {
  writeUserOnAuth,
  readUserProfile,
  updateUserProfile,
  addBookMark,
  getAllBookmarks,
  deleteBookMark,
};
