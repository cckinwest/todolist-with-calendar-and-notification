import React from "react";
import { Modal, Form, Button, Stack } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

function PatternForm({
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
    startDate: `${date.date}`,
    endDate: `${date.date}`,
    frequency: "daily",
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
      startDate: formData.startDate,
      endDate: formData.endDate,
      frequency: formData.frequency,
      userId: userId,
    };

    axios
      .post(`http://localhost:3002/pattern/create`, taskData)
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
        <Stack>
          <Form.Control
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            name="startDate"
          />
          <Form.Control
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            name="endDate"
          />
        </Stack>
        <Form.Select
          value={formData.frequency}
          onChange={handleChange}
          name="frequency"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="annually">Annually</option>
        </Form.Select>
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

export default PatternForm;
