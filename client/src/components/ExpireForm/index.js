import React from "react";
import { useState, useEffect } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function ExpireForm() {
  const [remain, setRemain] = useState(0);
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [isCritical, setIsCritical] = useState(false);

  const token = localStorage.getItem("token");
  let user;

  if (token) {
    user = jwtDecode(token);
  }

  useEffect(() => {
    let timer = setTimeout(() => {
      if (token && Date.now() / 1000 < user.exp) {
        const timeLeft = Math.round(user.exp - Date.now() / 1000);
        setRemain(timeLeft);

        if (timeLeft < 120) {
          setIsCritical(true);
        }
      } else {
        setShow(false);
        localStorage.removeItem("token");
        window.location.assign("/login");
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  const handleChange = (e) => {
    setWarning("");
    setPassword(e.target.value);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleClick = () => {
    if (password && user) {
      const userData = {
        username: user.username,
        password: password,
      };

      axios
        .post("http://localhost:3001/user/login", userData)
        .then((res) => {
          setShow(false);
          localStorage.setItem("token", res.data.token);
          window.location.assign("/dashboard");
        })
        .catch((err) => {
          setWarning("Some errors occured!");
        });

      setPassword("");
    }
  };

  return (
    <>
      <Button
        className="m-2"
        style={{ width: "auto" }}
        variant={isCritical ? "danger" : "light"}
        onClick={handleShow}
      >
        Click to renew token ({remain} s)
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {warning && <Alert variant="danger">{warning}</Alert>}
          <Form>
            <Form.Group className="mb-3" controlId="ExpirePassword">
              <Form.Control
                type="password"
                name="password"
                value={password}
                placeholder="Enter your password and click renew"
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClick}>Renew</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ExpireForm;
