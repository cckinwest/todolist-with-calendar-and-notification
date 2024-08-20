import React from "react";
import { Modal, Form, Button, Stack } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

function TaskModal({ date, task }) {
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    startTime: task.startTime,
    endTime: task.endTime,
    frequency: task.frequency,
  });

  const toTwoDigits = (num) => {
    if (num < 10) {
      return `0${num}`;
    }

    return `${num}`;
  };

  const handleString = (str) => {
    if (str.length > 18) {
      return `${str.slice(0, 15)}...`;
    }

    return str;
  };

  const handleClose = () => {
    setShow(false);
    setIsEdit(false);
  };

  const handleClick = () => {
    setShow(true);
    setIsEdit(false);
  };

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
      startTime: formData.startTime,
      endTime: formData.endTime,
      frequency: formData.frequency,
    };

    if (isEdit) {
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
    const taskData = { taskId: task._id };
    axios
      .put(`http://localhost:3002/todo/delete`, taskData)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Button
        variant="outline-primary"
        size="sm"
        className="rounded-pill"
        onClick={handleClick}
        disabled={date.status === "past"}
        style={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
          fontSize: "10px",
        }}
      >
        {`${toTwoDigits(new Date(formData.startTime).getHours())}:${toTwoDigits(
          new Date(formData.startTime).getMinutes()
        )} ${handleString(formData.title)}`}
      </Button>
      {show && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            {!isEdit ? (
              <Modal.Title>
                <Stack direction="horizontal" gap={3}>
                  <i className="bi bi-list-task"></i>
                  {formData.title}
                </Stack>
              </Modal.Title>
            ) : (
              <Form.Control
                type="text"
                value={formData.title}
                onChange={handleChange}
                name="title"
              />
            )}
          </Modal.Header>
          <Modal.Body>
            {!isEdit ? (
              <Stack direction="horizontal" gap={3}>
                <i className="bi bi-fonts"></i>
                {formData.description}
              </Stack>
            ) : (
              <Form.Control
                type="text"
                value={formData.description}
                onChange={handleChange}
                name="description"
              />
            )}
            <Stack
              direction="horizontal"
              className="d-flex justify-content-between mt-2 mb-2"
            >
              {!isEdit ? (
                <Stack direction="horizontal" gap={3}>
                  <i className="bi bi-calendar"></i>
                  {`${formData.startTime.split("T")[0]} ${toTwoDigits(
                    new Date(formData.startTime).getHours()
                  )}:${toTwoDigits(new Date(formData.startTime).getMinutes())}`}
                </Stack>
              ) : (
                <Form.Control
                  type="datetime-local"
                  value={`${formData.startTime.split("T")[0]}T${toTwoDigits(
                    new Date(formData.startTime).getHours()
                  )}:${toTwoDigits(new Date(formData.startTime).getMinutes())}`}
                  onChange={handleChange}
                  name="startTime"
                />
              )}
              {!isEdit ? (
                <Stack direction="horizontal" gap={3}>
                  <i className="bi bi-calendar-check"></i>
                  {`${formData.endTime.split("T")[0]} ${toTwoDigits(
                    new Date(formData.endTime).getHours()
                  )}:${toTwoDigits(new Date(formData.endTime).getMinutes())}`}
                </Stack>
              ) : (
                <Form.Control
                  type="datetime-local"
                  value={`${formData.endTime.split("T")[0]}T${toTwoDigits(
                    new Date(formData.endTime).getHours()
                  )}:${toTwoDigits(new Date(formData.endTime).getMinutes())}`}
                  onChange={handleChange}
                  name="endTime"
                />
              )}
            </Stack>
            {!isEdit ? (
              <Stack direction="horizontal" gap={3}>
                <i className="bi bi-clock"></i>
                {formData.frequency}
              </Stack>
            ) : (
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
            )}
          </Modal.Body>
          <Modal.Footer>
            <Stack direction="horizontal" gap={2}>
              <Button variant="outline-primary" onClick={handleEdit}>
                <Stack direction="horizontal" gap={2}>
                  <i className={isEdit ? "bi bi-floppy" : "bi bi-pencil"}></i>
                  {isEdit ? "Save" : "Edit"}
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
      )}
    </>
  );
}

export default TaskModal;
