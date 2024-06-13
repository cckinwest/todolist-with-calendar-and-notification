import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Button, Card, Alert, Stack, Collapse } from "react-bootstrap";

const Task = ({ taskId, title, description, startTime, frequency }) => {
  const [formData, setFormData] = useState({
    title: title,
    description: description,
    startTime: startTime,
    frequency: frequency,
  });

  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = () => {
    setEdit(!edit);

    if (edit) {
      const taskData = {
        id: taskId,
        title: formData.title,
        description: formData.description,
        startTime: formData.startTime,
        frequency: formData.frequency,
      };

      axios
        .put("http://localhost:3001/todo/update", taskData)
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDelete = () => {
    const taskData = { taskId: taskId };

    axios
      .put("http://localhost:3001/todo/delete", taskData)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return edit ? (
    <Form className="border border-1 rounded-3 bg-light bg-gradient p-2">
      <Stack direction="horizontal" className="d-flex justify-content-between">
        <Form.Group
          style={{ width: "33%", textAlign: "left" }}
          className="mb-3"
          controlId="EditTitle"
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
          controlId="EditStartTime"
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
          controlId="EditFrequency"
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

      <Form.Group className="mb-3" controlId="EditDescription">
        <Form.Control
          type="text"
          placeholder="Enter the task description"
          value={formData.description}
          onChange={handleChange}
          name="description"
        />
      </Form.Group>

      <Stack direction="horizontal" gap={2}>
        <Button variant="outline-primary" onClick={handleEdit}>
          Save
        </Button>
        <Button variant="outline-danger" onClick={handleDelete}>
          Delete
        </Button>
      </Stack>
    </Form>
  ) : (
    <Card bg="light">
      <Card.Body>
        <Card.Text>
          <Stack
            direction="horizontal"
            className="d-flex justify-content-between"
          >
            <div style={{ width: "33%", textAlign: "left" }}>
              <strong>Title: {formData.title}</strong>
            </div>
            <div style={{ width: "33%", textAlign: "center" }}>
              <strong>Start time: {formData.startTime.split("T")[0]}</strong>
            </div>
            <div style={{ width: "33%", textAlign: "right" }}>
              <strong>Frequency: {formData.frequency}</strong>
            </div>
          </Stack>
        </Card.Text>
        <Card.Text>
          <small>Description: {formData.description}</small>
        </Card.Text>
        <Stack direction="horizontal" gap={2}>
          <Button variant="outline-secondary" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="outline-danger" onClick={handleDelete}>
            Delete
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default Task;
