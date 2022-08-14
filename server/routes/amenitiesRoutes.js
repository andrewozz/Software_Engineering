const express = require("express");
const res = require("express/lib/response");
let router = express.Router();
const { getAmenities } = require("../controllers/amenitiesListingController");

router.get("/get-amenities-near-flats", getAmenities); //available resale flats onn listing
module.exports = router;
