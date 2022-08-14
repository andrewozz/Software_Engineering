import React from "react";
// Routing import
import { Link } from "react-router-dom";
// bootstrap imports
import { Carousel, Button } from "react-bootstrap";

//react icons import
import { AiOutlineArrowDown } from "react-icons/ai";
// Images import
import homePageCImage1 from "../../images/homePageBg1.jpg";
import homePageCImage2 from "../../images/homePageBg2.jpg";
import homePageCImage3 from "../../images/homePageBg3.jpg";

// CSS Styling report
import "../../styles/homepageStyles/homepageCarousell.modules.css";

//AuthContext import
import { useAuth } from "../../context/AuthContext";
function CarousellTop() {
  const { currentUser } = useAuth();
  return (
    <>
      <Carousel indicators={false}>
        <Carousel.Item className="cItemNum1">
          <img
            className="d-block w-100"
            src={homePageCImage1}
            alt="First slide"
          />
          <Carousel.Caption>
            <section className="carou1-heading">
              <div className="heading-card">
                <div className="cItem1-page-title">FOXTROT</div>
                <div className="courgette-font">
                  Everyone Deserves the Opportunity of Home
                </div>
                <div className="heading-widgets">

                  <div className="cItem1-btn-div">
                    {!currentUser && (
                      <>
                        <Link to="/signup">
                          <button id="cItem1-signup-btn" className="cItem1-btn">
                            Sign Up
                          </button>
                        </Link>
                        <Link to="/login">
                          <button id="cItem1-about-btn" className="cItem1-btn">
                            Login
                          </button>
                        </Link>
                      </>
                    )}
                    {currentUser && <div>Welcome {currentUser.email}</div>}
                  </div>
                </div>
              </div>
            </section>
            <section>
              <a href="#abt-sect" id="aTag-LMore">
                <div className="cItem1-last-div">
                  Learn more
                  <AiOutlineArrowDown className="arrow-down-icon" />
                </div>
              </a>
            </section>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={homePageCImage2}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={homePageCImage3}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default CarousellTop;
