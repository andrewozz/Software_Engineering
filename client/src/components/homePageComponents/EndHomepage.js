import React from "react";

// styles import
import "../../styles/homepageStyles/homePageEnd.modules.css";
import ContactUs from "./ContactUs";
import Footer from "./Footer";

function EndHomepage() {
  return (
    <>
      <section className="hpage-end-sect">
        <div className="hesect-div">
          <Footer />
        </div>
      </section>
    </>
  );
}

export default EndHomepage;
