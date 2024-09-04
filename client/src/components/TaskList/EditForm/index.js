import React from "react";
import { Modal, Form, Button, Stack } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "bootstrap-icons/font/bootstrap-icons.css";

function EditForm({ task, isEdit, setIsEdit }) {
  const isPattern = task.startDate ? true : false;

  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    startTime: dayjs(task.startTime).format("HH:mm"),
    endTime: dayjs(task.endTime).format("HH:mm"),
    startDate: isPattern
      ? task.startDate
      : dayjs(task.startTime).format("YYYY-MM-DD"),
    endDate: isPattern
      ? task.endDate
      : dayjs(task.startTime).format("YYYY-MM-DD"),
    frequency: isPattern ? task.frequency : "",
  });

  const [show, setShow] = useState(isEdit);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClose = () => {
    setShow(false);
    setIsEdit(false);
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);

    const taskData = {
      id: task._id,
      title: formData.title,
      description: formData.description,
      startTime: `${formData.startDate}T${formData.startTime}`,
      endTime: `${formData.startDate}T${formData.endTime}`,
      startDate: formData.startDate,
      endDate: formData.endDate,
      frequency: formData.frequency,
    };

    axios
      .put(
        isPattern
          ? `http://localhost:3002/pattern/update`
          : `http://localhost:3002/todo/update`,
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
        <Form.Control
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          name="startDate"
        />
        {isPattern && (
          <Form.Control
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            name="endDate"
          />
        )}
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
        {isPattern && (
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
        )}
      </Modal.Body>
      <Modal.Footer>
        <Stack direction="horizontal" gap={2}>
          <Button variant="outline-primary" onClick={handleEdit}>
            <Stack direction="horizontal" gap={2}>
              <i className="bi bi-floppy"></i>
              Save
            </Stack>
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
}

export default EditForm;
