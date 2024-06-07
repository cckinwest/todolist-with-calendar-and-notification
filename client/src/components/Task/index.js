import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

const Task = ({ taskId, title, description, startTime, frequency }) => {
  const [tasktitle, setTitle] = useState(title);
  const [taskdescription, setDescription] = useState(description);
  const [taskStartTime, setStartTime] = useState(startTime);
  const [taskFrequency, setFrequency] = useState(frequency);

  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(!edit);

    if (edit) {
      const taskData = {
        id: taskId,
        title: tasktitle,
        description: taskdescription,
        startTime: taskStartTime,
        frequency: taskFrequency,
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
          value={tasktitle}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="EditDescription">
        <Form.Control
          type="text"
          placeholder="Enter the task description"
          value={taskdescription}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="EditStartTime">
        <Form.Control
          type="date"
          value={taskStartTime}
          onChange={(e) => {
            setStartTime(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="EditFrequency">
        <Form.Select
          value={taskFrequency}
          onChange={(e) => {
            setFrequency(e.target.value);
          }}
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
        <Card.Title>Title: {tasktitle}</Card.Title>
        <Card.Text>Description: {taskdescription}</Card.Text>
        <Card.Text>Start time: {taskStartTime.split("T")[0]}</Card.Text>
        <Card.Text>Frequency: {taskFrequency}</Card.Text>
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
