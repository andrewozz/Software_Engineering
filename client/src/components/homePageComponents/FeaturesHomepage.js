import React from "react";

//css imports
import "../../styles/homepageStyles/homepageFeatures.modules.css";

//image imports
import hdbphoto1 from "../../images/homePage6.jpg";
import hdbphoto2 from "../../images/homePage5.jpg";

function FeaturesHomepage() {
  return (
    <>
      <section className="hpage-ft-sect">
        <div>
          <img className="ft-sect-img" src={hdbphoto1} />
        </div>
        <div className="sect-div-r sect-div-word">
          <p style={{ color: "white", fontWeight: "bold" }}>
            Lorem ipsum dolor sit amet
          </p>
        </div>
      </section>
      <section className="hpage-ft-sect">
        <div className="sect-div-l sect-div-word">
          <p style={{ color: "white", fontWeight: "bold" }}>
            Lorem ipsum dolor sit amet
          </p>
        </div>
        <div>
          <img className="ft-sect-img" src={hdbphoto2} />
        </div>
      </section>
      <section className="hpage-ft-sect">
        <div className="sect-div-word">
          <p>I will see if I can put a graph here</p>
        </div>
        <div className="sect-div-r sect-div-word">
          <p style={{ color: "white", fontWeight: "bold" }}>
            Lorem ipsum dolor sit amet
          </p>
        </div>
      </section>
    </>
  );
}

export default FeaturesHomepage;
