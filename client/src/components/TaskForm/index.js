import React from "react";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function TaskForm() {
  const token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [warning, setWarning] = useState("");

  let user;

  if (token) {
    user = jwtDecode(token);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title: title,
      description: description,
      userId: user.id,
    };

    axios
      .post("http://localhost:3001/todo/create", taskData)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        setWarning("There are some errors occured!");
      });

    setTitle("");
    setDescription("");
  };

  return (
    <div>
      {user && <h1>Hello {user.username}!</h1>}
      <p>{warning}</p>
      {user ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setWarning("");
            }}
          />
          <br />
          <label htmlFor="description">Description: </label>
          <input
            id="description"
            name="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setWarning("");
            }}
          />
          <br />
          <button type="submit">Add Task</button>
        </form>
      ) : (
        <h1>You are not authorized!</h1>
      )}
    </div>
  );
}

export default TaskForm;
