import React, { useState, useEffect } from "react";

import { Card } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { confetti } from "../helpers/confetti";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";
import { dateNowToStr } from "../helpers/dateHelper";
import { motion } from "framer-motion";
function SignupSuccessPage() {
  const { currentUser, curUsername } = useAuth();
  const { writeUserOnAuth } = useUser();
  const userObj = {
    uid: currentUser.uid,
    username: curUsername,
    email: currentUser.email,
    dateJoined: dateNowToStr(),
  };
  writeUserOnAuth(userObj);
  const [timer, setTimer] = useState(5);
  const navigate = useNavigate();
  const secondsLeft = () => {
    setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
  };
  const handlePageLoad = async () => {
    secondsLeft();
    const timerOut = await new Promise((r) => setTimeout(r, 5000));
    clearTimeout(timerOut);
    navigate("/home");
  };
  const start = () => {
    setTimeout(function () {
      confetti.start();
    }); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
  };
  const stop = () => {
    setTimeout(function () {
      confetti.stop();
    },100); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
  };
  useEffect(() => {
    handlePageLoad();
  }, [timer]);

  return (
    <>
      <motion.div initial={{ x: "-100vw" }} animate={{ x: 0 }}>
        <Card>
          <Card.Body>
            <div>
              {start()}
              {stop()}
              <h1>Successfully created an account!</h1>
              <p>Redirecting to home page in {timer} seconds...</p>
            </div>
          </Card.Body>
        </Card>
      </motion.div>
    </>
  );
}

export default SignupSuccessPage;
