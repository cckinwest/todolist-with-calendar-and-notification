import React from "react";
import { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [isWarning, setIsWarning] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMsg("Invalid username or password!");
      setIsWarning(true);
    } else {
      const userData = {
        username: username,
        password: password,
      };

      axios
        .post(`http://localhost:3002/user/login`, userData)
        .then((res) => {
          setMsg(`${username} login successfully!`);
          setIsWarning(false);
          localStorage.setItem("token", res.data.token);
          window.location.assign("/calendar");
        })
        .catch((err) => {
          setMsg("There are some errors in login!");
          setIsWarning(true);
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {msg && <Alert variant={isWarning ? "danger" : "light"}>{msg}</Alert>}
      <Form.Group className="mb-3" controlId="LoginUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setMsg("");
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="LoginPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setMsg("");
          }}
        />
      </Form.Group>

      <Button variant="light" type="submit">
        Login
      </Button>
    </Form>
  );
}

export default LoginForm;
