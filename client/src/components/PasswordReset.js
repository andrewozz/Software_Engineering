import React, { useRef, useState } from "react";

// react bootstrap imports
import { Form, Button, Alert, Card } from "react-bootstrap";
// context imports
import { useAuth } from "../context/AuthContext";
// react routing import
import { Link } from "react-router-dom";
// helper files import
import { resetInfoAlert, failedAlert } from "../helpers/sweetalerthelper";
//framer
import { motion } from "framer-motion";
//css styling import
import "../styles/authenticationpageStyles/resetpage.modules.css";

export default function PasswordReset() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      resetInfoAlert();
    } catch (err) {
      failedAlert(
        "Oops, something went wrong",
        "Failed to reset password. Did you entered the correct email?"
      );
    }
    setLoading(false);
  };
  return (
    <div className="reset">
      <div className="reset-background"></div>
      <div className="reset-modal">
        <motion.div
          initial={{ x: -250, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            ease: "easeOut",
            duration: 0.8,
          }}
        >
          <Card className="reset-card">
            <Card.Body>
              <h2 className="text-start mb-4">Reset Password</h2>
              <p style={{ color: "#495057" }}>
                Enter email to receive a link to reset your password.
              </p>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" required ref={emailRef} />
                </Form.Group>
                <motion.button
                  variant="dark"
                  disabled={loading}
                  type="submit"
                  className="w-100 mt-4 login-btn"
                  whileHover={{
                    backgroundColor: "#284b63",
                    boxShadow: "0px 0px 8px #3c6e71",
                  }}
                >
                  Reset Password
                </motion.button>
              </Form>
              <div className="w-100 text-center mt-3">
                Have an account? <Link to="/login">Log In</Link>
              </div>
            </Card.Body>
            <div className="w-100 text-center mt-2">
              Don't have an account? <Link to="/signup">Create an account</Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
