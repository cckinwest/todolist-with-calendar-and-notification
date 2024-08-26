import React from "react";
import { Modal, Form, Button, Stack } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "bootstrap-icons/font/bootstrap-icons.css";

function TaskEdit({
  date,
  task,
  show,
  handleClose,
  isEdit,
  setIsEdit,
  handleDelete,
}) {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    startTime: dayjs(task.startTime).format("HH:mm"),
    endTime: dayjs(task.endTime).format("HH:mm"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);

    const taskData = {
      id: task._id,
      title: formData.title,
      description: formData.description,
      startTime: `${date.date}T${formData.startTime}`,
      endTime: `${date.date}T${formData.endTime}`,
    };

    axios
      .put(`http://localhost:3002/todo/update`, taskData)
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
        <Form.Control
          type="text"
          value={formData.title}
          onChange={handleChange}
          name="title"
        />
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          value={formData.description}
          onChange={handleChange}
          name="description"
        />
        <Stack
          direction="horizontal"
          className="d-flex justify-content-between mt-2 mb-2"
        >
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
        <Stack direction="horizontal" gap={2}>
          <Button variant="outline-primary" onClick={handleEdit}>
            <Stack direction="horizontal" gap={2}>
              <i className="bi bi-floppy"></i>
              Save
            </Stack>
          </Button>
          <Button variant="outline-danger" onClick={handleDelete}>
            <Stack direction="horizontal" gap={2}>
              <i className="bi bi-trash3"></i>Delete
            </Stack>
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
}

export default TaskEdit;
