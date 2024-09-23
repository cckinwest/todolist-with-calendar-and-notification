import React from "react";
import { Modal, Form, Button, Stack } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "bootstrap-icons/font/bootstrap-icons.css";

function EditForm({ task, isEdit, setIsEdit }) {
  const [isIndividual, setIsIndividual] = useState(false);
  const isPattern = task.startDate ? true : false;

  const apiEndpoint = process.env.REACT_APP_URL;

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
    notification: task.notification,
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

  const handleMode = () => {
    setIsIndividual(!isIndividual);
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);

    const taskData = {
      id: task._id,
      patternId: task._id,
      title: formData.title,
      description: formData.description,
      startTime: `${formData.startDate}T${formData.startTime}`,
      endTime: `${formData.startDate}T${formData.endTime}`,
      startDate: formData.startDate,
      endDate: formData.endDate,
      frequency: formData.frequency,
      date: formData.startDate,
      notification: formData.notification,
      createdBy: task.createdBy,
    };

    axios
      .put(
        isPattern
          ? isIndividual
            ? `${apiEndpoint}/pattern/changeAnIndividual`
            : `${apiEndpoint}/pattern/update`
          : `${apiEndpoint}/todo/update`,
        taskData
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = () => {
    setIsEdit(!isEdit);

    axios
      .put(
        isPattern
          ? isIndividual
            ? `${apiEndpoint}/pattern/deleteAnIndividual`
            : `${apiEndpoint}/pattern/delete`
          : `${apiEndpoint}/todo/delete`,
        isPattern ? { patternId: task._id } : { taskId: task._id }
      )
      .then((res) => window.location.reload())
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isPattern
            ? isIndividual
              ? "Edit a task in Pattern"
              : "Edit Pattern"
            : "Edit Task"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-2">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={formData.title}
            onChange={handleChange}
            name="title"
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={formData.description}
            onChange={handleChange}
            name="description"
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>
            {isPattern && !isIndividual ? "StartDate" : "Date"}
          </Form.Label>
          <Form.Control
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            name="startDate"
          />
        </Form.Group>
        {isPattern && !isIndividual && (
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
        {isPattern && !isIndividual && (
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
          {isPattern && (
            <Button variant="outline-info" onClick={handleMode}>
              {isIndividual ? "Edit Pattern" : "Change a task in Pattern"}
            </Button>
          )}
          <Button variant="outline-primary" onClick={handleEdit}>
            <Stack direction="horizontal" gap={2}>
              <i className="bi bi-floppy"></i>
              Save
            </Stack>
          </Button>
          <Button variant="outline-danger" onClick={handleDelete}>
            <Stack direction="horizontal" gap={2}>
              <i className="bi bi-trash"></i>
              Delete
            </Stack>
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
}

export default EditForm;
