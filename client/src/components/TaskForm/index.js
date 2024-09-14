import React from "react";
import { Modal, Form, Button, Stack } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "bootstrap-icons/font/bootstrap-icons.css";
import { jwtDecode } from "jwt-decode";

function TaskForm({ show, setShow, date }) {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  const [pattern, setPattern] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: dayjs().format("HH:mm"),
    endTime: dayjs().format("HH:mm"),
    startDate: date ? date : dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    frequency: "daily",
    notification: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleAdd = () => {
    const taskData = {
      title: formData.title,
      description: formData.description,
      startTime: `${formData.startDate}T${formData.startTime}`,
      endTime: `${formData.startDate}T${formData.endTime}`,
      startDate: formData.startDate,
      endDate: formData.endDate,
      frequency: formData.frequency,
      notification: formData.notification,
      userId: user.id,
    };

    axios
      .post(
        pattern
          ? `http://localhost:3002/pattern/create`
          : `http://localhost:3002/todo/create`,
        taskData
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{pattern ? "Add Pattern" : "Add Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-2">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={formData.title}
            onChange={handleChange}
            name="title"
            placeholder="Enter the title"
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={formData.description}
            onChange={handleChange}
            name="description"
            placeholder="Enter the description"
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>{pattern ? "StartDate" : "Date"}</Form.Label>
          <Form.Control
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            name="startDate"
          />
        </Form.Group>
        {pattern && (
          <Form.Group className="mb-2">
            <Form.Label>EndDate</Form.Label>
            <Form.Control
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              name="endDate"
            />
          </Form.Group>
        )}
        <Form.Group className="mb-2">
          <Form.Label>StartTime</Form.Label>
          <Form.Control
            type="time"
            value={formData.startTime}
            onChange={handleChange}
            name="startTime"
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>EndTime</Form.Label>
          <Form.Control
            type="time"
            value={formData.endTime}
            onChange={handleChange}
            name="endTime"
          />
        </Form.Group>
        {pattern && (
          <Form.Group className="mb-2">
            <Form.Label>Frequency</Form.Label>
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
          </Form.Group>
        )}

        <Form.Group className="mb-2">
          <Form.Label>Notification?</Form.Label>
          <Form.Select
            value={formData.notification}
            onChange={handleChange}
            name="notification"
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </Form.Select>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Stack direction="horizontal" gap={2}>
          <Button
            variant="outline-info"
            onClick={() => {
              setPattern(!pattern);
            }}
          >
            {pattern ? "Task" : "Pattern"}
          </Button>
          <Button variant="outline-primary" onClick={handleAdd}>
            <Stack direction="horizontal" gap={2}>
              <i className="bi bi-plus-square"></i>
              Add
            </Stack>
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
}

export default TaskForm;
