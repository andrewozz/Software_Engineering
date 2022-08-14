import React, { useState, useEffect } from "react";

import axios from "axios";
import Listing from "../userSettingsComponents/Listing";

function Explore() {
  const [availListedFlats, setAvailListedFlats] = useState([]);
  const [flatKeys, setFlatsKeys] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3005/api/list-flats/get-listed-flats`)
      .then((res) => {
        const resData = res.data;
        console.table(resData);
        setAvailListedFlats(resData);
        setFlatsKeys(Object.keys(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  {
    if (availListedFlats) {
      return (
        <div className="listings" style={{ margin: "0px", paddingTop: "50px" }}>
          {flatKeys.map((key) => {
            return (
              <Listing
                bookmark={true}
                key={key}
                listedFlat={{ ...availListedFlats[key], fid: key }}
              />
            );
          })}
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default Explore;
