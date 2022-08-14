import React, { useContext, useState } from "react";

import axios from "axios";
// import { registerVersion } from "firebase/app";

const FlatsListingContext = React.createContext();
export const useFlatsListing = () => useContext(FlatsListingContext);

export const FlatsListingProvider = ({ children }) => {
  const [loading] = useState(false);
  const [flatSelectedId, setFlatSelectedId] = useState(0);
  const [flatListedState, setFlatListedState] = useState(true);
  const [dflatListedState, setdFlatListedState] = useState(true);
  const deleteListedFlat = (flatObj) => {
    console.table(flatObj);
    axios
      .delete("http://localhost:3005/api/list-flats/delete-listed-flat", {
        data: flatObj,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const createFlatsToList = async (flatsPostObj) => {
    console.log("Create flats objs");
    console.table(flatsPostObj);
    try {
      const res = await axios.post(
        "http://localhost:3005/api/list-flats/post-new-flat",
        flatsPostObj
      );
      console.table(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const updateListedFlat = (flatsUpdateObj) => {
    console.log("Update flats obj");
    console.table(flatsUpdateObj);
    axios
      .put(
        "http://localhost:3005/api/list-flats/update-listed-flat",
        flatsUpdateObj
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const value = {
    deleteListedFlat,
    createFlatsToList,
    updateListedFlat,
    flatSelectedId,
    setFlatSelectedId,
    flatListedState,
    setFlatListedState,
    dflatListedState,
    setdFlatListedState,
  };
  return (
    <FlatsListingContext.Provider value={value}>
      {!loading && children}
    </FlatsListingContext.Provider>
  );
};
