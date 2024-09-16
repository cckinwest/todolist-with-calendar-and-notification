import React from "react";
import { useState, useEffect, Fragment } from "react";
import { Modal, Form, Button, Row } from "react-bootstrap";
import dayjs from "dayjs";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Single({ task, responsed, setResponsed }) {
  const [show, setShow] = useState(true);

  const startTime = dayjs(task.startTime).format("HH:mm");
  const endTime = dayjs(task.endTime).format("HH:mm");

  const handleNotNotify = async () => {
    await axios.put(`http://localhost:3002/todo/update`, {
      id: task._id,
      notification: false,
    });

    setShow(false);
    setResponsed([...responsed, task._id]);
  };

  const handleNotifyAgain = () => {
    setShow(false);
    setResponsed([...responsed, task._id]);
  };

  return (
    show && (
      <Fragment key={task._id}>
        <Row className="mb-2">
          <h5>{`${task.title} (${startTime} - ${endTime})`}</h5>
        </Row>
        <Row className="mb-2" style={{ marginLeft: "0px", marginRight: "0px" }}>
          <Button variant="outline-danger" onClick={handleNotNotify}>
            Don't notify again
          </Button>
        </Row>
        <Row className="mb-2" style={{ marginLeft: "0px", marginRight: "0px" }}>
          <Button variant="outline-success" onClick={handleNotifyAgain}>
            Pls notify again
          </Button>
        </Row>
      </Fragment>
    )
  );
}

function Notification({ tasks }) {
  const user = jwtDecode(localStorage.getItem("token"));
  const [show, setShow] = useState(false);
  const [responsed, setResponsed] = useState([]);

  const arrOfTasks = tasks.filter((task) => {
    return (
      task.notification &&
      dayjs(task.startTime).format("YYYY-MM-DD") ===
        dayjs().format("YYYY-MM-DD") &&
      new Date(task.startTime).getTime() - new Date().getTime() < 3600000 &&
      new Date(task.startTime).getTime() > new Date().getTime()
    );
  });

  const handleClose = () => {
    setShow(false);
    window.location.reload();
  };

  setInterval(() => {
    setShow(true);
  }, 60000);

  if (responsed.length === arrOfTasks.length && arrOfTasks.length > 0) {
    window.location.reload();
  }

  return (
    responsed.length < arrOfTasks.length &&
    arrOfTasks.length > 0 &&
    show && (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{`Tasks one hour later`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {arrOfTasks.map((task) => {
            return (
              <Single
                task={task}
                responsed={responsed}
                setResponsed={setResponsed}
              />
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  );
}

export default Notification;
