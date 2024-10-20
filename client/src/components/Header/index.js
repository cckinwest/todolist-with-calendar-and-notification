import React from "react";
import { jwtDecode } from "jwt-decode";
import icon from "../../assets/todolistIcon.jpg";
import ExpireForm from "../ExpireForm";
import Notification from "../Notification";
import InstallButton from "../InstallButton";

import {
  Container,
  Nav,
  Navbar,
  Button,
  Image,
  NavbarText,
} from "react-bootstrap";

const Header = () => {
  const token = localStorage.getItem("token");
  let user = token ? jwtDecode(token) : null;

  const logout = () => {
    localStorage.removeItem("token");
    window.location.assign("/login");
  };

  return (
    <Navbar expand="lg" className="bg-light">
      <Container style={{ width: "100%", margin: 0 }}>
        <Navbar.Brand>
          <Nav.Link href={user ? "/calendar" : "/login"}>
            <Image src={icon} roundedCircle style={{ height: "50px" }} />
          </Nav.Link>
        </Navbar.Brand>
        <InstallButton />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/signup">Signup</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            {user && <Nav.Link href="/dashboard">Dashboard</Nav.Link>}
            {user && <Nav.Link href="/calendar">Calendar</Nav.Link>}
            {user && <Nav.Link onClick={logout}>Logout</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
        {user && <ExpireForm />}
      </Container>
    </Navbar>
  );
};

export default Header;
