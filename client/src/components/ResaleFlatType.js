import React, { useState } from "react";
import ResaleFlatTypeModal from "./ResaleFlatTypeModal";
import { AnimatePresence, motion } from "framer-motion";
const ResaleFlatType = (props) => {
  const [toggle, setToggle] = useState(false);

  return (
    <motion.div>
      <motion.div
        initial={{ y: "70vh" }}
        animate={{ y: "0" }}
        transition={{ duration: 1.2, type: "spring", stiffness: "120" }}
        className="resale-flat"
        onClick={() => setToggle(true)}
      >
        {" "}
        {/* when clicked on -> sets toggle state to true -> opens modal */}
        {/* Resale flat here */}
        <h5>Resale Flat Type</h5>
        <li>
          <span>Town: </span>
          {props.flattype[0].town}
        </li>
        <li>
          <span>Block: </span>
          {props.flattype[0].block}
        </li>
        <li>
          <span>street_name: </span>
          {props.flattype[0].street_name.toLowerCase()}
        </li>
        <li>
          <span>Storey-range: </span>
          {props.flattype[0].storey_range}
        </li>
        <li>
          <span>Flat-type: </span>
          {props.flattype[0].flat_type}
        </li>
      </motion.div>
      {/* Resale flat modal pops up when flat type is clicked on */}
      <AnimatePresence>
        {toggle ? (
          <ResaleFlatTypeModal
            flatType={props.flattype}
            closeFunction={setToggle}
          />
        ) : (
          <div></div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ResaleFlatType;
