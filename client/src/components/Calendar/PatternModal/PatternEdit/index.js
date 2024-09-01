import React from "react";
import { Modal, Form, Button, Stack } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "bootstrap-icons/font/bootstrap-icons.css";

function PatternEdit({
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
    startDate: task.startDate,
    endDate: task.endDate,
    frequency: task.frequency,
  });

  const [editPattern, setEditPattern] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditMode = () => {
    setEditPattern(!editPattern);
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);

    const taskData = {
      patternId: task._id,
      title: formData.title,
      description: formData.description,
      startTime: `${date.date}T${formData.startTime}`,
      endTime: `${date.date}T${formData.endTime}`,
      createdBy: task.createdBy,
      startDate: formData.startDate,
      endDate: formData.endDate,
      frequency: formData.frequency,
      date: date.date,
    };

    axios
      .put(`http://localhost:3002/pattern/changeAnIndividual`, taskData)
      .then((res) => {
        console.log(res.data);
        handleClose();
        window.location.assign("/calendar");
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
        {editPattern && (
          <Stack
            direction="horizontal"
            className="d-flex justify-content-between mt-2 mb-2"
          >
            <Form.Control
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              name="startTime"
            />

            <Form.Control
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              name="endTime"
            />
          </Stack>
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
        {editPattern && (
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
          <Button variant="outline-info" onClick={handleEditMode}>
            {editPattern ? "Whole Pattern" : "Individual Only"}
          </Button>
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

export default PatternEdit;
