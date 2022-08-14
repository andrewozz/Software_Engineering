const express = require("express");
const res = require("express/lib/response");
let router = express.Router();
const resaleFlatController = require("../controllers/resaleFlatController");

router.get(
  "/getall-resale-flats",
  resaleFlatController.getAvailableResaleFlats
); //available resale flats onn listing
router.get(
  "/getresale-flat-transactions",
  resaleFlatController.getResaleFlatTransactions
); //filtering and querying for resale flat transactions

module.exports = router;
