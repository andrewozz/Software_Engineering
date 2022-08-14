import React, { useContext } from "react";
import ResaleFlatType from "../components/ResaleFlatType";
import { AnimatePresence, motion } from "framer-motion";
// Context import
import { ResaleFlatContext } from "../context/ResaleFlatContext";

const Search = () => {
  const { filteredData } = useContext(ResaleFlatContext);

  return (
    <div className="search-page">
      {filteredData.length ? (
        <div>
          <h5> Displaying {filteredData.length} results ...</h5>
          {filteredData.map((flatType, index) => {
            return <ResaleFlatType key={index} flattype={flatType} />;
          })}
        </div>
      ) : (
        <h2 style={{ textAlign: "center", padding: "20px" }}>
          There are no records to be found!{" "}
        </h2>
      )}
    </div>
  );
};

export default Search;
