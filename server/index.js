const express = require("express");
const app = express();
const port = 3005;
const bodyParser = require("body-parser");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");

// @Andrew install dotenv package in server so this will work
const dotenv = require("dotenv").config();
app.use(cors());
const firebase = require("./config/config");
app.use(express.json());
app.use(bodyParser.json()); // <--- Here
app.use(bodyParser.urlencoded({ extended: true }));

//root route
app.get("/", (req, res) => {
  res.send("HEY WELCOME");
});

//resale-flats route
const resaleflats = require("./routes/resaleFlatsRoutes");
app.use("/api/resale-flats", resaleflats);
//user settings route
app.use("/api/users", require("./routes/userProfileSettings"));
app.use("/api/list-flats", require("./routes/flatsListingRoutes"));
app.use("/api/amenities", require("./routes/amenitiesRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server started on ${port}`);
});
