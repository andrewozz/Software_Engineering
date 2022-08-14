// axios import
import Axios from "axios";

import React, { useState, useContext } from "react";

// react routing import
import { useNavigate } from "react-router-dom";

// contexts imports
import { ResaleFlatContext } from "../context/ResaleFlatContext";

// utilities import
import SearchBarData from "../utilities/SearchBarData.json";

const SearchBar = () => {
  let navigate = useNavigate();
  const { setFilteredData } = useContext(ResaleFlatContext);

  //variables
  // const [searchClick, setSearchClick] = useState(0);
  const [town, setTown] = useState("");
  const [roomtype, setRoomtype] = useState("");
  const [block, setBlock] = useState("");
  const [street, setStreet] = useState("");
  const [storeyRange, setStoreyRange] = useState("");

  //Functions
  //Function -> displaying filtered results
  const displayResults = () => {
    navigate("/Search");
  };

  //validation func for  block and street
  const validateFields = () => {
    var check = [true, true]; //block and street respectively
    //block field check
    if (block !== "") {
      const num = Number(block);
      if (Number.isInteger(num) === false) check[0] = false;
    }
    //street field check
    if (street !== "") {
      const streetnum = Number(street);
      if (Number.isInteger(streetnum) == true) check[1] = false;
    }
    if (check[0] && check[1] === true) {
      return true;
    } //fields validated
    else {
      if (check[0] === false && check[1] === false) {
        alert("Invalid fields entered!");
        window.location.reload(false);
        return false;
      }
      if (check[0] === false) {
        alert("Invalid field for block!");
        setBlock("");
        window.location.reload(false);
      }
      if (check[1] === false) {
        alert("Invalid field for street!");
        setStreet("");
        window.location.reload(false);
      }
      return false;
    }
  };

  //Function -> for Axios to communicate with server side. Pass the field variables for api call then get back response in json
  const getResaleFlatTransactions = async () => {
    //validating input fields such as block and street, as for dropdowns, those fields are forced to be valid.
    const check = validateFields();
    if (check === true) {
      console.log("fields validated");
    } //invalid field input
    else {
      return;
    }

    Axios.get(
      "http://localhost:3005/api/resale-flats/getresale-flat-transactions",
      {
        //pass in input field variables here
        params: {
          town: town,
          block: block,
          flatTypes: roomtype,
          street: street,
          storeyRange: storeyRange,
        },
      }
    ).then((response) => {
      const data = response.data;
      setFilteredData(data);
      displayResults();
    });
  };

  //Function -> pass the input field text to the searhbar field variables
  const textController = (e, setFunction) => {
    e.preventDefault();
    const value = e.target.value;
    setFunction(value);
  };

  return (
    <div>
      <div className="searchbar">
        <div>
          {/* Town Field */}
          <select
            className="searchfield town"
            onChange={(e) => textController(e, setTown)}
          >
            <option value="" disabled selected hidden>
              {" "}
              Town
            </option>
            <option value=""></option>
            {SearchBarData.towns.map((town) => {
              return <option value={town}>{town}</option>;
            })}
          </select>

          {/* Block Field */}
          <input
            type="text"
            className="searchfield block"
            placeholder="Block"
            onChange={(e) => textController(e, setBlock)}
          ></input>

          {/* Street Field */}
          <input
            type="text"
            className="searchfield street"
            placeholder="Street name"
            onChange={(e) => {
              const streetName = e.target.value;
              const streetNameUpper = streetName.toUpperCase();
              setStreet(streetNameUpper);
            }}
          ></input>

          {/* Storey Range Field */}

          <select
            className="searchfield storey"
            onChange={(e) => textController(e, setStoreyRange)}
          >
            <option value="" disabled selected hidden>
              Storey
            </option>
            <option value=""></option>
            {SearchBarData.storeyRange.map((storeytype) => {
              return <option value={storeytype}>{storeytype}</option>;
            })}
          </select>

          {/* roomtype */}
          <select
            className="searchfield flatTypes"
            onChange={(e) => textController(e, setRoomtype)}
          >
            <option value="" disabled selected hidden>
              Room Type
            </option>
            <option value=""></option>
            {SearchBarData.flatTypes.map((room) => {
              return <option value={room}>{room}</option>;
            })}
          </select>
        </div>
        <div>
          <button
            className="search-btn"
            type="button"
            onClick={getResaleFlatTransactions}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
