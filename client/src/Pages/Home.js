import React from "react";

//Components import
import CarousellTop from "../components/homePageComponents/CarousellTop";
import FlowchartHomePage from "../components/homePageComponents/FlowchartHomePage";
import ServicesHomePage from "../components/homePageComponents/ServicesHomePage";
import AboutHomePageFeatures from "../components/homePageComponents/AboutHomePage2";
import EndHomepage from "../components/homePageComponents/EndHomepage";
import ContactUs from "../components/homePageComponents/ContactUs";


function Home() {
  return (
    <>
      <CarousellTop />
      <FlowchartHomePage />
      <ServicesHomePage />
      <AboutHomePageFeatures />
      <ContactUs />
      <EndHomepage />
    </>
  );
}

export default Home;
