import React from "react";
import { Modal, Form, Button, Stack } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

function TaskForm({
  date,
  userId,
  show,
  setShow,
  handleClose,
  taskType,
  handleChangeType,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: `${date.date}T00:00`,
    endTime: `${date.date}T00:00`,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleClick = () => {
    const startTime = `${date.date}T${formData.startTime}`;
    const endTime = `${date.date}T${formData.endTime}`;
    const taskData = {
      title: formData.title,
      description: formData.description,
      startTime: startTime,
      endTime: endTime,
      userId: userId,
    };

    axios
      .post(`http://localhost:3002/todo/create`, taskData)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });

    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Form.Control
          type="text"
          placeholder="Enter the title"
          value={formData.title}
          onChange={handleChange}
          name="title"
        />
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          placeholder="Enter the description"
          value={formData.description}
          onChange={handleChange}
          name="description"
        />
        <Stack>
          <Form.Control
            type="time"
            value={formData.startTime}
            onChange={handleChange}
            name="startTime"
          />
          <Form.Control
            type="time"
            value={formData.endTime}
            onChange={handleChange}
            name="endTime"
          />
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleChangeType}>
          {taskType}
        </Button>
        <Button variant="outline-success" onClick={handleClick}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TaskForm;
