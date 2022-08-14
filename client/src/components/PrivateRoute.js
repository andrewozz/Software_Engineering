import React from "react";

// react routing imports
import { Navigate, Outlet } from "react-router-dom";

// contexts imports
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute() {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/home" />;
}
