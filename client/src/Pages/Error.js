import React from "react";
// react routing imports
import { Navigate } from "react-router-dom";
function Error() {
  return <Navigate to="/dashboard" />;
}

export default Error;
