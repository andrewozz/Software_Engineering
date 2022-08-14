const express = require("express");
const {
  getAllFlatsListed,
  postNewFlat,
  getOnlyUserListedFlats,
  updateListedFlats,
  deleteFlatListing,
  getBookMarkedFlats,
  sendEmailToSeller,
} = require("../controllers/flatsListingController");

let router = express.Router();
router.get("/get-listed-flats", getAllFlatsListed);
router.get("/get-user-listed-flats", getOnlyUserListedFlats);
router.post("/post-new-flat", postNewFlat);
router.put("/update-listed-flat", updateListedFlats);
router.delete("/delete-listed-flat", deleteFlatListing);
router.get("/get-bookmarked-flats", getBookMarkedFlats);
router.post("/send-email-to-seller",sendEmailToSeller);

module.exports = router;
