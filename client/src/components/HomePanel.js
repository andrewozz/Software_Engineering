import React from "react";

//components import
import Searchbar from "./SearchBar";

const HomePanel = () => {
  return (
    <div className="homepage">
      <div className="homepanel-background"></div>
      <form className="homepanel">
        <h2 className="title">FOXTROT</h2>
        <div>
          <Searchbar />
        </div>
      </form>
    </div>
  );
};

export default HomePanel;
