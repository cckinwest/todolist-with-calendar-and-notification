import React from "react";
import { useState, useEffect } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function ExpireForm() {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  const apiEndpoint = process.env.REACT_APP_URL || "http://localhost:3002";

  const [remain, setRemain] = useState(
    Math.round(user.exp - Date.now() / 1000)
  );
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [isCritical, setIsCritical] = useState(false);

  const popUpTime = [300, 270, 240, 210, 180, 120, 90, 60, 30];

  useEffect(() => {
    let timer = setTimeout(() => {
      if (token && Date.now() / 1000 < user.exp) {
        const timeLeft = Math.round(user.exp - Date.now() / 1000);
        setRemain(timeLeft);

        if (popUpTime.includes(timeLeft)) {
          setShow(true);
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
        .post(`${apiEndpoint}/user/login`, userData)
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {warning && <Alert variant="danger">{warning}</Alert>}
          <Form>
            <Form.Group className="mb-3" controlId="ExpirePassword">
              <Form.Label>Time Left: {remain} seconds</Form.Label>
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
