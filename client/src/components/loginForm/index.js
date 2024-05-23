import React from "react";
import { useState } from "react";
import axios from "axios";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setWarning("Invalid username or password!");
    } else {
      const userData = {
        username: username,
        password: password,
      };

      axios.post("http://localhost:3001/user/login", userData).then((res) => {
        console.log(res);

        if (res.data.token) {
          setWarning(`${username} login successfully!`);
          localStorage.setItem("token", res.data.token);
          window.location.assign("/dashboard");
        } else {
          setWarning("There are some errors in login!");
        }
      });
    }
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
