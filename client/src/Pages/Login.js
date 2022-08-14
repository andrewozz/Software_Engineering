import React from "react";
// routing imports
import { Navigate } from "react-router-dom";
// contexts imports
import { useAuth } from "../context/AuthContext";
// components import
import LoginComp from "../components/LoginComp";

function Login() {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/" /> : <LoginComp />;
}

export default Login;
