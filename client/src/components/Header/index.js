import React from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { Container, Nav, Navbar, Button } from "react-bootstrap";

const Header = () => {
  const token = localStorage.getItem("token");
  let user;

  if (token) {
    user = jwtDecode(token);
  }

  const logout = () => {
    localStorage.removeItem("token");
    window.location.assign("/login");
  };

  return (
    <Navbar expand="lg" className="bg-light">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/signup">Signup</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            {user && <Nav.Link href="/dashboard">Dashboard</Nav.Link>}
            {user && (
              <Button variant="light" onClick={logout}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
