import React, { useState } from "react";

import ListingAddModal from "./ListingAddModal";

function ListingAdd() {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div>
        <button
          onClick={() => setToggle(true)}
          className="btn add-listing"
          style={{ color: "white", textAlign: "center", width: "100%" }}
        >
          Add Listing
        </button>
      </div>
      {toggle ? (
        <ListingAddModal closeModalFunction={setToggle} />
      ) : (
        <div></div>
      )}
    </>
  );
}

export default ListingAdd;
