import React from "react";
import { useState } from "react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setWarning("Invalid username or password!");
    } else {
      setWarning(`${username} with ${password} is registered successfully!`);
    }
  };

  return (
    <div style={{ fontFamily: "Arial" }}>
      <p>{warning}</p>
      <form onSubmit={handleSubmit}>
        <label for="username">Username: </label>
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
        <label for="password">Password: </label>
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
