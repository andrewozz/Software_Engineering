import React from "react";
import { motion } from "framer-motion";
import Explore from "../components/exploreComponent/Explore";
const ExplorePage = () => {
  return (
    <motion.div
      className="explore"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "easeIn", duration: 2 }}
      exit={{
        opacity: 0,
        x: -100,
      }}
    >
      <motion.div className="exploreBackground"></motion.div>

      <Explore />
    </motion.div>
  );
};

export default ExplorePage;
