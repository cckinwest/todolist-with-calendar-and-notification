import React from "react";
import { useState } from "react";
import axios from "axios";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setWarning("Invalid username or password!");
    } else {
      const userData = {
        username: username,
        password: password,
      };

      const res = await axios.post(
        "http://localhost:3001/user/signup",
        userData
      );

      console.log(res);

      if (res.data.username) {
        setWarning(`${username} is registered successfully!`);
        localStorage.setItem("username", res.data.username);
      } else {
        setWarning("There are some errors in the registration!");
      }
    }

    setUsername("");
    setPassword("");
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
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default SignupForm;
