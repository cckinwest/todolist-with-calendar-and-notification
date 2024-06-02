import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

const Task = ({ taskId, title, description }) => {
  const [formData, setFormData] = useState({
    tasktitle: title,
    taskdescription: description,
  });

  const [edit, setEdit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    setEdit(!edit);

    if (edit) {
      const taskData = {
        id: taskId,
        title: formData.tasktitle,
        description: formData.taskdescription,
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
      <Form.Group className="mb-3" controlId="EditTitle">
        <Form.Control
          type="text"
          value={formData.tasktitle}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="EditDescription">
        <Form.Control
          type="text"
          value={formData.taskdescription}
          onChange={handleChange}
        />
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
        <Card.Title>{formData.tasktitle}</Card.Title>
        <Card.Text>{formData.taskdescription}</Card.Text>
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
