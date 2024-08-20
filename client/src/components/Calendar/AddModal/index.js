import React from "react";
import { Modal, Form, Button, Stack } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import "bootstrap-icons/font/bootstrap-icons.css";
//import { postDB, getAllDB, getOneDB } from "../../../database";

function AddModal({ date }) {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  const [show, setShow] = useState(false);
  const [hoverAdd, setHoverAdd] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: `${date.date}T00:00`,
    endTime: `${date.date}T00:00`,
    frequency: "none",
  });

  const handleClose = () => {
    setShow(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAdd = () => {
    if (date.status === "current") {
      setShow(true);
    }
  };

  const handleClick = () => {
    const taskData = {
      title: formData.title,
      description: formData.description,
      startTime: formData.startTime,
      endTime: formData.endTime,
      frequency: formData.frequency,
      userId: user.id,
    };

    axios
      .post(`http://localhost:3002/todo/create`, taskData)
      .then((res) => {
        //postDB(taskData);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });

    setShow(false);
  };

  return (
    <>
      <i
        className="bi bi-plus-circle"
        onClick={handleAdd}
        onMouseEnter={() => {
          setHoverAdd(true);
        }}
        onMouseLeave={() => {
          setHoverAdd(false);
        }}
        style={{
          transition: "0.3s",
          color: hoverAdd && "white",
          backgroundColor: hoverAdd && "#0d6efd",
          height: "24px",
          width: "24px",
          borderRadius: "50%",
        }}
      ></i>

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
                type="datetime-local"
                value={formData.startTime}
                onChange={handleChange}
                name="startTime"
              />
              <Form.Control
                type="datetime-local"
                value={formData.endTime}
                onChange={handleChange}
                name="endTime"
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
