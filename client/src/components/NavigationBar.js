import React from "react";

// react-bootstrap import
import { Navbar, Container, Nav } from "react-bootstrap";
// react routing import
import { Link } from "react-router-dom";
// components import
import Logout from "../components/Logout";
// context imports
import { useAuth } from "../context/AuthContext";

const NavigationBar = ({ dropdownToggled, setToggleDropdown }) => {
  const toggle = () => {
    setToggleDropdown(!dropdownToggled);
  };
  const { currentUser } = useAuth();
  return (
    currentUser && (
      <>
        <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
          <Container className="navbar">
            <Navbar.Brand className="navbarlogo">
              <Link className="navbarBrand" to="/">
                FOXTROT
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle className="navbar-toggle" onClick={toggle} />
            <Navbar.Collapse>
              <Nav className="me-auto">
                <Link className="navbarlink" to="/home">
                  Home
                </Link>
                <Link className="navbarlink" to="/explore">
                  Explore
                </Link>
                <Link className="navbarlink" to="/settings">
                  Settings
                </Link>
                {/* @Andrew link to homepanel page is here */}
                <Link className="navbarlink" to="/homepanel">
                  HomePanel
                </Link>
              </Nav>
              {currentUser && <Logout />}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    )
  );
};

export default NavigationBar;
