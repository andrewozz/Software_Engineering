import React from "react";

// react bootstrap imports
import { Button } from "react-bootstrap";

//
import { GrLogout } from "react-icons/gr";
// context import
import { useAuth } from "../context/AuthContext";
// helper files import
import { failedAlert } from "../helpers/sweetalerthelper";
// routing imports
import { useNavigate } from "react-router-dom";
function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/login");
    } catch {
      failedAlert(
        "Log out failed",
        "Something wrong happened. Please try again."
      );
    }
  };
  const btStyle = {
    backgroundColor: "#adb5bd",
    color: "#000000",
    border: "2px solid #495057",
  };
  return (
    <>
      <div>
        <Button style={btStyle} onClick={handleLogout}>
          Log Out
          <GrLogout className="logout-btn-icon" />
        </Button>
      </div>
    </>
  );
}

export default Logout;
