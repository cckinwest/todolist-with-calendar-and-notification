import React from "react";
import axios from "axios";
import { useState } from "react";
import { Form, Button, Card, Stack } from "react-bootstrap";
import dayjs from "dayjs";

const Task = ({ taskId, title, description, startTime, endTime }) => {
  const [formData, setFormData] = useState({
    title: title,
    description: description,
    startTime: startTime,
    endTime: endTime,
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
        endTime: formData.endTime,
      };

      axios
        .put(`http://localhost:3002/todo/update`, taskData)
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
      .put(`http://localhost:3001/todo/delete`, taskData)
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
            type="datetime-local"
            value={formData.startTime}
            onChange={handleChange}
            name="startTime"
          />
        </Form.Group>

        <Form.Group
          style={{ width: "33%", textAlign: "center" }}
          className="mb-3"
          controlId="EditEndTime"
        >
          <Form.Control
            type="datetime-local"
            value={formData.endTime}
            onChange={handleChange}
            name="endTime"
          />
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p>
              {`${formData.title} ${dayjs(formData.startTime).format(
                "YYYY-MM-DD HH:mm"
              )} to ${dayjs(formData.endTime).format("HH:mm")}`}
            </p>
            <p>{formData.description}</p>
          </div>
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
