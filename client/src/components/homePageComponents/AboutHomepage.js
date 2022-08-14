import React from "react";

// css styles import
import "../../styles/homepageStyles/homepageAbout.modules.css";
function AboutHomepage() {
  return (
    <>
      <section className="hpage-about-section" id="abt-sect">
        <section className="hpage-about-section2">
          <h2 className="about-section2-h2">Lorem ipsum dolor sit amet.</h2>
          <div className="about-section-2-div">
            Curabitur euismod erat a nisi dapibus, sit amet semper magna
            egestas. Sed purus nibh, viverra et diam sit amet, sagittis pretium
            arcu. Quisque quis suscipit ante. Fusce quis nisl pellentesque,
            malesuada velit ut, sollicitudin magna.
          </div>
        </section>
      </section>
    </>
  );
}

export default AboutHomepage;
