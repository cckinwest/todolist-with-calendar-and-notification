import React from "react";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { Form, Button, Alert, CloseButton, Stack } from "react-bootstrap";

function TaskForm() {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: "",
    frequency: "none",
  });

  const [msg, setMsg] = useState("");
  const [isWarning, setIsWarning] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.title) {
      const taskData = {
        title: formData.title,
        description: formData.description,
        startTime: formData.startTime,
        frequency: formData.frequency,
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
      setMsg("You must fill in the title of the task!");
      setIsWarning(true);
    }

    setFormData({
      title: "",
      description: "",
      startTime: "",
      frequency: "none",
    });
  };

  return showForm ? (
    <Form
      style={{ width: "99vw" }}
      className="border border-1 rounded-3 bg-light bg-gradient p-3 m-2"
      onSubmit={handleSubmit}
    >
      {msg && <Alert variant={isWarning ? "danger" : "light"}>{msg}</Alert>}
      <Stack direction="horizontal" className="d-flex justify-content-between">
        <Form.Group
          style={{ width: "33%", textAlign: "left" }}
          className="mb-3"
          controlId="TaskTitle"
        >
          <Form.Control
            type="text"
            placeholder="Enter the task title"
            value={formData.title}
            onChange={handleChange}
            name="title"
          />
        </Form.Group>

        <Form.Group
          style={{ width: "33%", textAlign: "center" }}
          className="mb-3"
          controlId="TaskStartTime"
        >
          <Form.Control
            type="date"
            value={formData.startTime.split("T")[0]}
            onChange={handleChange}
            name="startTime"
          />
        </Form.Group>

        <Form.Group
          style={{ width: "33%", textAlign: "right" }}
          className="mb-3"
          controlId="TaskFrequency"
        >
          <Form.Select
            value={formData.frequency}
            onChange={handleChange}
            name="frequency"
          >
            <option value="none">None</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="annually">Annually</option>
          </Form.Select>
        </Form.Group>
      </Stack>

      <Form.Group className="mb-3" controlId="TaskDescription">
        <Form.Control
          type="text"
          placeholder="Enter the task description"
          value={formData.description}
          onChange={handleChange}
          name="description"
        />
      </Form.Group>

      <Stack direction="horizontal" gap={2}>
        <Button variant="outline-primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="outline-danger" onClick={handleClose}>
          Close
        </Button>
      </Stack>
    </Form>
  ) : (
    <Button
      className="m-2"
      variant="outline-primary"
      onClick={handleClick}
      style={{ width: "99vw" }}
    >
      Add Task
    </Button>
  );
}

export default TaskForm;
