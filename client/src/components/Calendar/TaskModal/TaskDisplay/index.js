import React from "react";
import { Modal, Button, Stack } from "react-bootstrap";
import { useState } from "react";
import dayjs from "dayjs";
import "bootstrap-icons/font/bootstrap-icons.css";
import EditForm from "../../../EditForm";
import axios from "axios";

function TaskDisplay({ task, show, setShow }) {
  const isPattern = task.startDate ? true : false;

  const apiEndpoint = process.env.REACT_APP_URL || "http://localhost:3002";

  const [isEdit, setIsEdit] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleDelete = () => {
    const taskData = { taskId: task._id, patternId: task._id };
    axios
      .put(
        isPattern
          ? `${apiEndpoint}/pattern/delete`
          : `${apiEndpoint}/todo/delete`,
        taskData
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return isEdit ? (
    <EditForm task={task} isEdit={isEdit} setIsEdit={setIsEdit} />
  ) : (
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
        {isPattern && (
          <>
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
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Stack direction="horizontal" gap={2}>
          <Button variant="outline-primary" onClick={handleEdit}>
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

export default TaskDisplay;
