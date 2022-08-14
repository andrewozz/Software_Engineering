// Directly handles data to and from database (firebase,sql)

const { getDatabase, ref, set, child, get } = require("firebase/database"); //importing firebase CRUD functions
const dbase = require("../db"); // initialise firebase db with configurations
const db = ref(getDatabase()); //get ref variable to db object

module.exports = class ResaleFlat {
  constructor(
    month,
    town,
    flat_type,
    block,
    street_name,
    storey_range,
    floor_area_sqm,
    flat_model,
    lease_commence_date,
    remaining_lease,
    resale_price
  ) {
    this.month = month;
    this.town = town;
    this.flat_type = flat_type;
    this.block = block;
    this.street_name = street_name;
    this.storey_range = storey_range;
    this.floor_area_sqm = floor_area_sqm;
    this.flat_model = flat_model;
    this.lease_commence_date = lease_commence_date;
    this.remaining_lease = remaining_lease;
    this.resale_price = resale_price;
  }

  static getResaleFlatById = (id) => {
    //query for specific resaleflat
  };

  static fetchAllResaleFlats() {
    return new Promise((resolve, reject) => {
      get(child(db, "/resale-flats")).then((snapshot) => {
        if (snapshot.val()) {
          var arr = [];
          snapshot.forEach((child) => {
            arr.push(child.val());
          });
          resolve(arr);
          console.log("SUCCESS");
        } else {
          reject("ERROR!");
        }
      });
    });
  }
};
