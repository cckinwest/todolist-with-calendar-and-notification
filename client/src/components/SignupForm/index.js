import React from "react";
import { useState } from "react";
import axios from "axios";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [warning, setWarning] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || !confirm) {
      setWarning("Invalid username or password!");
    } else if (password !== confirm) {
      setWarning("Password cannot be confirmed!");
    } else {
      const userData = {
        username: username,
        password: password,
      };

      axios.post("http://localhost:3001/user/signup", userData).then((res) => {
        console.log(res.data);
        if (
          res.data.message &&
          res.data.message === "The username is already used!"
        ) {
          setWarning("The username is already used!");
        } else if (res.data.token) {
          setWarning(`${username} is registered successfully!`);
          localStorage.setItem("token", res.data.token);
          window.location.assign("/dashboard");
        } else {
          setWarning("There are some errors in the signup!");
        }
      });
    }

    setUsername("");
    setPassword("");
    setConfirm("");
  };

  return (
    <div style={{ fontFamily: "Arial" }}>
      <p>{warning}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          placeholder="username"
          name="username"
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setWarning("");
          }}
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          placeholder="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setWarning("");
          }}
        />
        <br />
        <label htmlFor="confirm">Confirm password: </label>
        <input
          placeholder="confirm password"
          name="confirm"
          id="confirm"
          value={confirm}
          onChange={(e) => {
            setConfirm(e.target.value);
            setWarning("");
          }}
        />
        <br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default SignupForm;
