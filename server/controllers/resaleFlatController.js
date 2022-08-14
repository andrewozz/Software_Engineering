const express = require("express");
const resaleFlat = require("../models/ResaleFlat");
const db = require("../db");
const fetch = require("node-fetch");

//utility functions
const returnFilled = (town, block, streetName, storeyRange, flatTypes) => {
  filledFields = [0, 0, 0, 0, 0];
  if (town != "") filledFields[0] = 1;
  if (block != "") filledFields[1] = 1;
  if (streetName != "") filledFields[2] = 1;
  if (storeyRange != "") filledFields[3] = 1;
  if (flatTypes != "") filledFields[4] = 1;
  return filledFields;
};

const constructApiUrl = (filledFields, data) => {
  fields = ["town", "block", "street_name", "storey_range", "flat_type"];
  const urlroot =
    "https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&limit=1000;";
  var filters = "";
  const numFields = 5;
  for (i = 0; i < numFields; i++) {
    if (filledFields[i] == 1) {
      // not null fields -> proceed to do search for this field
      filters = filters.concat(`"${fields[i]}":"${data[i]}",`);
    }
  }
  filters = filters.slice(0, -1);
  const url = urlroot + "filters={" + filters + "}";
  // console.log(url);
  return url;
};

const groupBy = (input) => {
  fields = ["town", "block", "street_name", "storey_range", "flat_type"];
  possiblekeys = []; // all possible keys among the grouped resale flats
  return input.reduce((acc, currentValue) => {
    let townKey = currentValue[fields[0]];
    let blockKey = currentValue[fields[1]];
    let streetNamekey = currentValue[fields[2]];
    let storeyRangeKey = currentValue[fields[3]];
    let flatTypeKey = currentValue[fields[4]];
    let finalkey =
      townKey + blockKey + streetNamekey + storeyRangeKey + flatTypeKey; // composite key here
    // console.log(finalkey);
    if (!possiblekeys.includes(finalkey)) {
      acc[finalkey] = [];
      possiblekeys.push(finalkey);
    }
    acc[finalkey].push(currentValue);
    return acc;
  }, {});
};

//Main controller functions
const getResaleFlatTransactions = async (req, res) => {
  //method to obtain filtered resale flat transactions
  const data = req.query;
  const { block, town, street, flatTypes, storeyRange } = data;
  const fieldValues = [town, block, street, storeyRange, flatTypes];
  const filledFields = returnFilled(
    town,
    block,
    street,
    storeyRange,
    flatTypes
  );

  //check which fields are entered
  const apiUrl = constructApiUrl(filledFields, fieldValues); // construct api string url
  const records = await fetch(apiUrl);
  const recordJson = await records.json();
  const dataJson = recordJson.result;

  //groupBy function to grp similar flat types
  const groupedData = await groupBy(dataJson.records);
  // console.log(groupedData);
  res.status(200).json(Object.values(groupedData));
};

async function getAvailableResaleFlats(req, res) {
  //method to obtain all the resale flats available  from models/resaleFlat
  var flats = await resaleFlat.fetchAllResaleFlats();
  res.send(flats);
  // console.log(flats);
}

module.exports = {
  getResaleFlatTransactions,
  getAvailableResaleFlats,
};
