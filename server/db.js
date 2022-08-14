//db.js
// utlitity db to establish connection to database in firebase
const firebase = require("firebase/app");
const { getDatabase } = require("firebase/database");
const database = require("firebase/database");
const config = require("./config/config");
const firebaseConfig = config.firebaseConfig;
// console.log(firebaseConfig);
// Initialize Firebase
const db = firebase.initializeApp(firebaseConfig);
module.exports = { db };
