import React from "react";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { Form, Button, Alert, CloseButton } from "react-bootstrap";

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
      className="p-3 m-3 bg-light position-relative"
      onSubmit={handleSubmit}
    >
      {msg && <Alert variant={isWarning ? "danger" : "light"}>{msg}</Alert>}
      <Form.Group className="mb-3 mt-3" controlId="TaskTitle">
        <Form.Control
          type="text"
          placeholder="Enter the task title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="TaskDescription">
        <Form.Control
          type="text"
          placeholder="Enter the task description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="TaskStartTime">
        <Form.Control
          type="date"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="TaskFrequency">
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

      <Button variant="light" type="submit">
        Add Task
      </Button>

      <CloseButton
        onClick={handleClose}
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
