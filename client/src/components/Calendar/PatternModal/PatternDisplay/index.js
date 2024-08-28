import React from "react";
import { Modal, Button, Stack } from "react-bootstrap";
import { useState } from "react";
import dayjs from "dayjs";
import "bootstrap-icons/font/bootstrap-icons.css";

function PatternDisplay({
  task,
  show,
  handleClose,
  isEdit,
  setIsEdit,
  handleDelete,
}) {
  const handleSave = () => {
    setIsEdit(!isEdit);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap={3}>
            <i className="bi bi-list-task"></i>
            {task.title}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="horizontal" gap={3}>
          <i className="bi bi-fonts"></i>
          {task.description}
        </Stack>
        <Stack
          direction="horizontal"
          className="d-flex justify-content-between mt-2 mb-2"
        >
          <Stack direction="horizontal" gap={3}>
            <i className="bi bi-clock"></i>
            {`${dayjs(task.startTime).format("HH:mm")}`}
          </Stack>

          <Stack direction="horizontal" gap={3}>
            <i className="bi bi-clock-fill"></i>
            {`${dayjs(task.endTime).format("HH:mm")}`}
          </Stack>
        </Stack>
        <Stack
          direction="horizontal"
          className="d-flex justify-content-between mt-2 mb-2"
        >
          <Stack direction="horizontal" gap={3}>
            <i className="bi bi-calendar-event"></i>
            {`${task.startDate}`}
          </Stack>

          <Stack direction="horizontal" gap={3}>
            <i className="bi bi-calendar-event-fill"></i>
            {`${task.endDate}`}
          </Stack>
        </Stack>
        <Stack direction="horizontal" gap={3}>
          <i className="bi bi-bell"></i>
          {task.frequency}
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        <Stack direction="horizontal" gap={2}>
          <Button variant="outline-primary" onClick={handleSave}>
            <Stack direction="horizontal" gap={2}>
              <i className="bi bi-pencil"></i>
              Edit
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

export default PatternDisplay;
