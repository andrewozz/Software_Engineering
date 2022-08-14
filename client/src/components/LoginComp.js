import React, { useRef, useState } from "react";

// react bootstrap import
import { Form, Button, Alert, Card } from "react-bootstrap";

// context import
import { useAuth } from "../context/AuthContext";
// react routing import
import { Link, useNavigate } from "react-router-dom";

// helper files import
import { successAlert, failedAlert } from "../helpers/sweetalerthelper";

// import css styles
import "../styles/authenticationpageStyles/loginpage.modules.css";

// Framer import
import { motion } from "framer-motion";
export default function LoginComp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      successAlert(
        "Login Success",
        "Successfully logged in! Redirecting you to homepage..."
      );
      await new Promise((r) => setTimeout(r, 2000));
      setLoading(false);
      navigate("/home");
    } catch (err) {
      failedAlert(
        "Login Failed!",
        "Oops something went wrong. Did you entered the correct email/ password?"
      );
      setLoading(false);
    }
  };
  return (
    <div className="login">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ ease: "easeOut", duration: 1 }}
        className="login-background"
      ></motion.div>
      <div className="login-modal">
        <motion.div
          initial={{ y: -250, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 180,
            duration: 0.8,
            delay: 1.1,
          }}
        >
          <Card className="login-card">
            <Card.Body>
              <h2 className="text-start mb-4">Sign in to our platform</h2>
              <p style={{ color: "#495057" }}>
                Login here using your email and password
              </p>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" required ref={emailRef} />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" required ref={passwordRef} />
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
                  Sign In
                </motion.button>
              </Form>
              <div className="w-100 text-center mt-3">
                Forgot Password?{" "}
                <Link to="/forgot-password">Reset Password</Link>
              </div>
              <div className="w-100 text-center mt-2">
                Don't have an account?{" "}
                <Link to="/signup">Create an account</Link>
              </div>
            </Card.Body>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
