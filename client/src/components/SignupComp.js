import React, { useRef, useState } from "react";

// react bootstrap imports
import { Form, Button, Alert, Card } from "react-bootstrap";

// contexts import
import { useAuth } from "../context/AuthContext";

// react routing imports
import { Link, useNavigate } from "react-router-dom";

//css styling
import "../styles/authenticationpageStyles/signuppage.modules.css";

//framer import
import { motion } from "framer-motion";
// helper files import
import {
  successAlert,
  failedAlert,
  warningAlert,
} from "../helpers/sweetalerthelper";

export default function SignupComp() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordCfmRef = useRef();
  const { signup, setCurUsername } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordCfmRef.current.value) {
      warningAlert(
        "Passwords do not match",
        "Passwords do not match. Please make sure passwords entered in on both fields match."
      );
      return;
    }
    try {
      setError("");
      setLoading(true);

      await signup(emailRef.current.value, passwordRef.current.value);
      setCurUsername(usernameRef.current.value);
      successAlert(
        "Registration Submitted",
        "Details Submitted! System is validating your details...."
      );
      await new Promise((r) => setTimeout(r, 2000));
      setLoading(false);
      navigate("/signup-success");
    } catch {
      failedAlert(
        "Registration failed.",
        "Oops something went wrong. Failed to create account. Please try again"
      );
      setLoading(false);
    }
  };
  return (
    <div className="signup">
      <div className="signup-background"></div>
      <div className="signup-modal">
        <motion.div
          initial={{ x: 250, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            ease: "easeOut",
            duration: 0.8,
          }}
        >
          <Card className="signup-card">
            <Card.Body>
              <h2 className="text-start mb-4">Create an account</h2>
              <p style={{ color: "#495057" }}>
                Please enter your username, email and password.
              </p>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" required ref={usernameRef} />
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" required ref={emailRef} />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" required ref={passwordRef} />
                </Form.Group>
                <Form.Group id="passwordCfm">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" required ref={passwordCfmRef} />
                </Form.Group>
                <motion.button
                  variant="dark"
                  disabled={loading}
                  type="submit"
                  className="w-100 mt-4 login-btn"
                  whileHover={{
                    backgroundColor: "#f95738",
                    boxShadow: "0px 0px 8px #ff9f1c",
                  }}
                >
                  Create Account
                </motion.button>
              </Form>
            </Card.Body>
            <div className="w-100 text-center mt-2">
              Already have an account? <Link to="/login">Log In</Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
