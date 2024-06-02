import React from "react";
import { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [isWarning, setIsWarning] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || !confirm) {
      setMsg("Invalid username or password!");
      setIsWarning(true);
    } else if (password !== confirm) {
      setMsg("Password cannot be confirmed!");
      setIsWarning(true);
    } else {
      const userData = {
        username: username,
        password: password,
      };

      axios.post("http://localhost:3001/user/signup", userData).then((res) => {
        if (
          res.data.message &&
          res.data.message === "The username is already used!"
        ) {
          setMsg("The username is already used!");
          setIsWarning(true);
        } else if (res.data.token) {
          setMsg(`${username} is registered successfully!`);
          setIsWarning(false);
          localStorage.setItem("token", res.data.token);
          window.location.assign("/dashboard");
        } else {
          setMsg("There are some errors in the signup!");
          setIsWarning(true);
        }
      });
    }

    setUsername("");
    setPassword("");
    setConfirm("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      {msg && <Alert variant={isWarning ? "danger" : "light"}>{msg}</Alert>}
      <Form.Group className="mb-3" controlId="SignupUsername">
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

      <Form.Group className="mb-3" controlId="SignupPassword">
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

      <Form.Group className="mb-3" controlId="SignupConfirm">
        <Form.Label>Confirm</Form.Label>
        <Form.Control
          type="password"
          placeholder="confirm password"
          value={confirm}
          onChange={(e) => {
            setConfirm(e.target.value);
            setMsg("");
          }}
        />
      </Form.Group>

      <Button variant="light" type="submit">
        Signup
      </Button>
    </Form>
  );
}

export default SignupForm;
