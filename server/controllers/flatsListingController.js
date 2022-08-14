const express = require("express");
const nodemailer = require("nodemailer");
const db = require("../db");

const flatsInfo = require("../utilities/FlatsInfo.json");
const {
  getDatabase,
  ref,
  set,
  get,
  push,
  orderByKey,
  query,
  update,
  remove,
} = require("firebase/database");
const { async } = require("@firebase/util");
const { cookie } = require("express/lib/response");
const rtimeDb = getDatabase();

const getAllFlatsListed = (req, res) => {
  const flatsRef = ref(rtimeDb, "flats");
  const flatsRefOrdered = query(flatsRef, orderByKey());
  get(flatsRefOrdered)
    .then((snapshot) => {
      if (snapshot.exists()) {
        // console.table(snapshot.val());
        res.status(200).json(snapshot.val());
      } else {
        console.log("No data available");
        res.status(200).json(snapshot.val());
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json(error);
    });
};

const getOnlyUserListedFlats = (req, res) => {
  const { uid } = req.query;
  if (uid === "" || uid === null) {
    res.status(400);
    throw new Error("Empty inputs field revert!");
  }
  // console.table(req.query);
  const flatsRef = ref(rtimeDb, "flats");
  const filteredRes = {};
  get(flatsRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const unfilteredRes = snapshot.val();
        for (const flats in unfilteredRes) {
          if (unfilteredRes[flats].uid === uid) {
            filteredRes[flats] = unfilteredRes[flats];
          }
        }
        // console.table(filteredRes);
        // console.log("Get flats listed by user results success!");
        res.status(200).json(filteredRes);
      } else {
        console.log("No data available");
        res.status(200).json(snapshot.val());
      }
    })  
    .catch((error) => {
      console.error(error);
      res.status(400).json(error);
    });
};

const postNewFlat = (req, res) => {
  const {
    uid,
    town,
    street,
    block,
    unitNo,
    resalePrice,
    flatType,
    sft,
    remainingLease,
    addInfo,
  } = req.body;
  // console.table(req.body);
  if (
    uid === "" ||
    town === "" ||
    street == "" ||
    block === "" ||
    unitNo === "" ||
    resalePrice === "" ||
    flatType === "" ||
    sft === "" ||
    remainingLease === "" ||
    addInfo === ""
  ) {
    res.status(400);
    throw new Error("Empty inputs field revert!");
  }
  if (
    !(
      uid &&
      town &&
      street &&
      block &&
      unitNo &&
      resalePrice &&
      flatType &&
      sft &&
      remainingLease &&
      addInfo
    )
  ) {
    res.status(400);
    throw new Error("Empty inputs field revert 1!");
  }

  if (!parseFloat(resalePrice)) {
    res.status(400);
    throw new Error("Invalid type input!");
  }

  if (parseFloat(resalePrice) <= 0) {
    res.status(400);
    throw new Error("Negative/ Zero values for resalePrice of housing!");
  }
  // Check if the data is inside the json files for the town

  if (!flatsInfo["towns"].includes(town.toUpperCase())) {
    res.status(400);
    throw new Error("User entered an invalid flat!");
  }

  const flatObj = {
    uid: uid,
    town: town,
    street: street,
    block: block,
    unitNo: unitNo,
    resalePrice: parseFloat(resalePrice),
    flatType: flatType,
    sft: sft,
    remainingLease: remainingLease,
    addInfo: addInfo,
  };
  // console.table(flatObj);
  /* 
  Algorithm:
  
  1. First create a flat
  2. Get the list of flats that 
  */
  const flatsRef = push(ref(rtimeDb, "flats/"));
  try {
    set(flatsRef, flatObj)
      .then(() => {
        // console.log("Flats post success!");
        const flatsRef = query(ref(rtimeDb, "flats"), orderByKey());
        get(flatsRef)
          .then((snapshot) => {
            const flatsList = snapshot.val();
            const flatsListKey = Object.keys(flatsList);
            let latestFlatFid;
            for (let i = flatsListKey.length - 1; i >= 0; i--)
              if (flatsList[flatsListKey[i]].uid === uid) {
                latestFlatFid = flatsListKey[i];
                break;
              }
            res.status(200).json({ latestFlatFid: latestFlatFid });
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "Something went wrong" });
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const updateListedFlats = (req, res) => {
  const {
    uid,
    fid,
    townReq,
    blockReq,
    streetReq,
    unitNoReq,
    resalePriceReq,
    flatTypeReq,
    sftReq,
    remainingLeaseReq,
    addInfoReq,
  } = req.body;
  // console.table(req.body);
  if (uid === "" || fid === "" || uid === null || fid === null) {
    res.status(400);
    throw new Error("Empty inputs field revert!");
  }
  console.log(resalePriceReq);
  if (!parseFloat(resalePriceReq)) {
    res.status(400);
    console.log("here!");
    throw new Error("Invalid type input!");
  }

  if (parseFloat(resalePriceReq) <= 0) {
    res.status(400);
    throw new Error("Negative/ Zero values for resalePrice of housing!");
  }
  if (!flatsInfo["towns"].includes(townReq.toUpperCase())) {
    res.status(400).json({ message: "Invalid town input!" });
    throw new Error("Invalid town input entered!");
  }
  const flatsRef = ref(rtimeDb, "flats/" + fid);
  get(flatsRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const flatRes = snapshot.val();
        if (flatRes.uid !== uid) {
          res.status(400).json({ message: "Invalid user" });
        } else {
          const {
            block,
            resalePrice,
            town,
            street,
            flatType,
            sft,
            unitNo,
            remainingLease,
            addInfo,
          } = snapshot.val();
          // console.table(snapshot.val());
          const updateObj = {
            town: townReq !== "" && townReq !== null ? townReq : town,
            block: blockReq !== "" && blockReq !== null ? blockReq : block,
            street: streetReq !== "" && streetReq !== null ? streetReq : street,
            flatType:
              flatTypeReq !== "" && flatTypeReq !== null
                ? flatTypeReq
                : flatType,
            resalePrice:
              resalePriceReq !== "" && resalePriceReq !== null
                ? parseFloat(resalePriceReq)
                : resalePrice,
            sft: sftReq !== "" && sftReq !== null ? sftReq : sft,
            unitNo: unitNoReq !== "" && unitNoReq !== null ? unitNoReq : unitNo,
            remainingLease:
              remainingLeaseReq !== "" && remainingLeaseReq !== null
                ? remainingLeaseReq
                : remainingLease,
            addInfo:
              addInfoReq !== "" && addInfoReq !== null ? addInfoReq : addInfo,
          };
          update(flatsRef, updateObj).then(() => {
            console.log("update success");
            res.status(200).json({ message: "Update success!!" });
          });
        }
      } else {
        console.log("No data available");
        res.status(400).json({ message: "No data available" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json(error);
    });
};
const deleteFlatListing = (req, res) => {
  const { uid, fid } = req.body;
  // console.table(req.body);
  if (uid === "" || fid === "" || uid === null || fid === null) {
    res.status(400);
    throw new Error("Empty inputs field revert!");
  }
  const flatsRef = ref(rtimeDb, "flats/" + fid);
  get(flatsRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const flatRes = snapshot.val();
        if (flatRes.uid !== uid) {
          res.status(400).json({ message: "Invalid user" });
        } else {
          remove(flatsRef).then(() => {
            console.log("delete success");
            res.status(200).json({ message: "Delete success!!" });
          });
        }
      } else {
        console.log("No data available");
        res.status(400).json({ message: "No data available" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json(error);
    });
};

const getBookMarkedFlats = async (req, res) => {
  const flatIdObject = req.query;
  const keyEntries = Object.keys(flatIdObject);
  var fidEntries = [];

  //obtainng a list of fid in bookmarks
  for (var i = 0; i < keyEntries.length; i++) {
    const flatObj = JSON.parse(flatIdObject[keyEntries[i]]);
    fidEntries.push(flatObj.fid);
  }
  const flatDetails = {}; //for us to append this into a list of json objects and send over to frontend
  const flatsRef = ref(rtimeDb, "flats/");
  await get(flatsRef).then((snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach((snap) => {
        // console.log(snap.key);
        if (fidEntries.includes(snap.key)) {
          flatDetails[snap.key] = snap.val();
          // console.table(snap.val());
        }
      });
    } else {
      console.log("no flats available to see.");
    }
  });
  const data = flatDetails;
  res.status(200).json(data);
};

// Send email to seller of the flat listing
const sendEmailToSeller = (req,res) =>
{
  const data = req.body;
  const textString = `Hello! This is foxtrot! There is an interested buyer for your flat! The following\
  details are the buyer's details. He have reached out to you with the main purpose of ${data.purpose}. 
  \nName of interested buyer: ${data.name} \nEmail of interested buyer: ${data.buyerEmail}. \nMessage: ${data.message}. \nRegards, Foxtrot Team `

  let transporter = nodemailer.createTransport({
    service : "gmail",
    auth:
    {
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PW,
    }
  })

  let mailOptions = {
    from: process.env.EMAIL_ACCOUNT,
    to:  data.sellerEmail ,
    text: textString,
  }

  //built in function by nodemailer
  transporter.sendMail(mailOptions, function(err,data)
  {
    if (err)
    {
      console.log(err);
    }
    else //successfully send email to seller
    {
      console.log("email sent");
    }
  })

}

module.exports = {
  getAllFlatsListed,
  postNewFlat,
  getOnlyUserListedFlats,
  updateListedFlats,
  deleteFlatListing,
  getBookMarkedFlats,
  sendEmailToSeller,
};
