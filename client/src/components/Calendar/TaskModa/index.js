import React from "react";
import { Modal, Stack } from "react-bootstrap";
import { useState } from "react";

function TaskModal({ task, show, setShow }) {
  const handleClose = () => {
    setShow(false);
  };

  return (
    show && (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Stack
            direction="horizontal"
            className="d-flex justify-content-between"
          >
            <h2>{task.title}</h2>
            <p>{task.startTime}</p>
          </Stack>
        </Modal.Header>
        <Modal.Body>{task.description}</Modal.Body>
      </Modal>
    )
  );
}

export default TaskModal;
