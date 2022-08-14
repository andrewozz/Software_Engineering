import { React, useState, createContext } from "react";

export const ResaleFlatContext = createContext();

export const ResaleFlatProvider = (props) => {
  
  //variables
  const [filteredData, setFilteredData] = useState([]);

  return (
    <ResaleFlatContext.Provider value={{ filteredData, setFilteredData }}>
      {props.children}
    </ResaleFlatContext.Provider>
  );
};
