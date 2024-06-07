import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

const Task = ({ taskId, title, description, startTime, frequency }) => {
  const [formData, setFormData] = useState({
    title: title,
    description: description,
    startTime: startTime,
    frequency: frequency,
  });

  const [edit, setEdit] = useState(false);

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
    <Form>
      <Form.Group className="mb-3 mt-3" controlId="EditTitle">
        <Form.Control
          type="text"
          placeholder="Enter the task title"
          value={formData.title}
          onChange={handleChange}
          name="title"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="EditDescription">
        <Form.Control
          type="text"
          placeholder="Enter the task description"
          value={formData.description}
          onChange={handleChange}
          name="description"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="EditStartTime">
        <Form.Control
          type="date"
          value={formData.startTime.split("T")[0]}
          onChange={handleChange}
          name="startTime"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="EditFrequency">
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

      <Button variant="light" onClick={handleEdit}>
        Save
      </Button>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
    </Form>
  ) : (
    <Card bg="light">
      <Card.Body>
        <Card.Title>Title: {formData.title}</Card.Title>
        <Card.Text>Description: {formData.description}</Card.Text>
        <Card.Text>Start time: {formData.startTime.split("T")[0]}</Card.Text>
        <Card.Text>Frequency: {formData.frequency}</Card.Text>
        <Button variant="light" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Task;
