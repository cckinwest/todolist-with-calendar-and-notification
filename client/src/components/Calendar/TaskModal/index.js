import React from "react";
import { Modal, Form, Button, Stack } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

function TaskModal({ date, task }) {
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    startTime: task.startTime,
    frequency: task.frequency,
  });

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
      frequency: formData.frequency,
    };

    if (isEdit) {
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
    const taskData = { taskId: task._id };
    axios
      .put("http://localhost:3001/todo/delete", taskData)
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
        disabled={date.status === 'past'}
        style={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {formData.title}
      </Button>
      {show && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            {!isEdit ? (
              <Modal.Title>{formData.title}</Modal.Title>
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
              <div>{formData.description}</div>
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
              className="d-flex justify-content-between mt-2"
            >
              {!isEdit ? (
                <div>{formData.startTime.split("T")[0]}</div>
              ) : (
                <Form.Control
                  type="date"
                  value={formData.startTime.split("T")[0]}
                  onChange={handleChange}
                  name="startTime"
                />
              )}
              {!isEdit ? (
                <div>{formData.frequency}</div>
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
            </Stack>
          </Modal.Body>
          <Modal.Footer>
            <Stack direction="horizontal" gap={2}>
              <Button variant="outline-primary" onClick={handleEdit}>
                {isEdit ? "Save" : "Edit"}
              </Button>
              <Button variant="outline-danger" onClick={handleDelete}>
                Delete
              </Button>
            </Stack>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default TaskModal;
