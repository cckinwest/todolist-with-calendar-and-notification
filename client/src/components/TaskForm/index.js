import React from "react";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { Form, Button, Alert, CloseButton } from "react-bootstrap";

function TaskForm() {
  const token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");
  const [isWarning, setIsWarning] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const user = jwtDecode(token);

  const handleClick = () => {
    setShowForm(true);
  };

  const handleCLose = () => {
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title && description) {
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
          setMsg("There are errors in adding the task!");
          setIsWarning(true);
        });

      setShowForm(false);
    } else {
      setMsg("You must fill in the title and description of the task!");
      setIsWarning(true);
    }

    setTitle("");
    setDescription("");
  };

  return showForm ? (
    <Form
      className="p-3 m-3 bg-light position-relative"
      onSubmit={handleSubmit}
    >
      {msg && <Alert variant={isWarning ? "danger" : "light"}>{msg}</Alert>}
      <Form.Group className="mb-3 mt-3" controlId="TaskTitle">
        <Form.Control
          type="text"
          placeholder="Enter the task title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setMsg("");
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="TaskDescription">
        <Form.Control
          type="text"
          placeholder="Enter the task description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setMsg("");
          }}
        />
      </Form.Group>

      <Button variant="light" type="submit">
        Add Task
      </Button>

      <CloseButton
        onClick={handleCLose}
        style={{ top: "5px", right: "5px" }}
        className="position-absolute"
      />
    </Form>
  ) : (
    <Button className="m-3" variant="light" onClick={handleClick}>
      Add Task
    </Button>
  );
}

export default TaskForm;
