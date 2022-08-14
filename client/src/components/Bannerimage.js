import React from "react";
import { motion } from "framer-motion";
import userBannerImg from "../images/user_banner_image.jpg";
const Bannerimage = () => {
  return (
    <motion.div
      initial={{ y: "70vh" }}
      animate={{ y: 0 }}
      transition={{ ease: "easeOut", duration: 1.2 }}
      className="user-banner"
    ></motion.div>
  );
};

export default Bannerimage;
