import React from "react";
import { Modal, Form, Button, Stack } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

function AddModal({ date }) {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: date.date,
    frequency: "none",
  });

  const handleClose = () => {
    setShow(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClick = () => {
    const taskData = {
      title: formData.title,
      description: formData.description,
      startTime: formData.startTime,
      frequency: formData.frequency,
      userId: user.id,
    };

    axios
      .post("http://localhost:3001/todo/create", taskData)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });

    setShow(false);
  };

  return (
    <>
      <Button
        size="sm"
        variant="outline-success"
        className="rounded-pill"
        onClick={() => {
          setShow(true);
        }}
      >
        Add
      </Button>
      {show && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Form.Control
              type="text"
              placeholder="Enter the title"
              value={formData.title}
              onChange={handleChange}
              name="title"
            />
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              type="text"
              placeholder="Enter the description"
              value={formData.description}
              onChange={handleChange}
              name="description"
            />
            <Stack>
              <Form.Control
                type="date"
                value={formData.startTime}
                onChange={handleChange}
                name="startTime"
              />
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
            </Stack>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-success" onClick={handleClick}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default AddModal;
