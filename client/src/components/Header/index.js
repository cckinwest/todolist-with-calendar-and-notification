import React from "react";
import { jwtDecode } from "jwt-decode";
import icon from "../../assets/todolistIcon.jpg";

import { Container, Nav, Navbar, Button, Image } from "react-bootstrap";

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
    <Navbar style={{ height: "10vh" }} expand="lg" className="bg-light">
      <Container>
        <Navbar.Brand>
          <Image src={icon} roundedCircle style={{ height: "50px" }} />
        </Navbar.Brand>
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
