const express = require("express");
const {
  writeUserOnAuth,
  readUserProfile,
  updateUserProfile,
  addBookMark,
  getAllBookmarks,
  deleteBookMark,
} = require("../controllers/userProfileSettingsController");

let router = express.Router();

router.post("/create-user", writeUserOnAuth);
router.get("/get-user-profile", readUserProfile);
router.put("/update-profile", updateUserProfile);
router.put("/add-bookmark",addBookMark);
router.delete("/delete-bookmark",deleteBookMark);
router.get("/get-all-bookmarks",getAllBookmarks);

module.exports = router;
