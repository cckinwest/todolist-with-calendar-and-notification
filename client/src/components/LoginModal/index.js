import React from "react";
import { useState } from "react";

import { Modal, Form, Button, Alert } from "react-bootstrap";

import axios from "axios";

function LoginModal() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showForm, setShowForm] = useState(true);
  const [warning, setWarning] = useState("");

  const apiEndpoint = process.env.REACT_APP_URL || "http://localhost:3002";

  const handleSubmit = () => {
    if (!username || !password) {
      setWarning("Please enter username and password!");
    }

    if (username && password) {
      axios
        .post(`${apiEndpoint}/user/login`, {
          username: username,
          password: password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          setShowForm(false);
          res.data.token && window.location.reload();
        })
        .catch((err) => {
          setWarning(`Error: ${err}`);
        });
    }
  };

  return (
    <>
      {!localStorage.getItem("token") && (
        <Modal show={showForm}>
          <Modal.Header>Please Login</Modal.Header>
          <Form>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setWarning("");
                  }}
                />
                <Form.Text>{warning}</Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setWarning("");
                  }}
                />
                <Form.Text>{warning}</Form.Text>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-danger" onClick={handleSubmit}>
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </>
  );
}

export default LoginModal;
