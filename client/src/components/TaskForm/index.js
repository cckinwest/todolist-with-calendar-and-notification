import React from "react";
import { Modal, Form, Button, Stack } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "bootstrap-icons/font/bootstrap-icons.css";
import { jwtDecode } from "jwt-decode";

function TaskForm({ show, setShow, date }) {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  const [pattern, setPattern] = useState(false);
  const [acceptNotification, setAcceptNotification] = useState(true);

  const apiEndpoint = process.env.REACT_APP_URL || "http://localhost:3002";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: dayjs().format("HH:mm"),
    endTime: dayjs().format("HH:mm"),
    startDate: date ? date : dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    frequency: "daily",
    notification: true,
    notificationTime: "1h",
  });

  const [warning, setWarning] = useState({
    title: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "title" && value) {
      setWarning((prevWarning) => ({ ...prevWarning, [name]: "" }));
    }

    if (name === "startTime" || name === "endTime") {
      setWarning((prevWarning) => ({
        ...prevWarning,
        startTime: "",
        endTime: "",
      }));
    }

    name === "notification" &&
      (value === "true"
        ? setAcceptNotification(true)
        : setAcceptNotification(false));
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleCheck = async (start, end) => {
    var pass = true;

    const todos = await axios.get(
      `${apiEndpoint}/todo/?username=${user.username}`
    );

    const startms = new Date(start).getTime();
    const endms = new Date(end).getTime();

    todos.data.forEach((todo) => {
      const startTime = new Date(todo.startTime).getTime();
      const endTime = new Date(todo.endTime).getTime();

      if (
        (startms >= startTime && startms <= endTime) ||
        (endms >= startTime && endms <= endTime) ||
        (startms <= startTime && endms >= endTime)
      ) {
        console.log(todo.title);
        console.log("The time is occupied by some event!");
        pass = false;
      }
    });

    console.log("No task occupy the time!");

    return pass;
  };

  const handleAdd = async () => {
    const alarmTime =
      formData.notificationTime === "1h"
        ? dayjs(`${formData.startDate}T${formData.startTime}`)
            .subtract(1, "hour")
            .format("YYYY-MM-DDTHH:mm")
        : formData.notificationTime === "30min"
        ? dayjs(`${formData.startDate}T${formData.startTime}`)
            .subtract(30, "minute")
            .format("YYYY-MM-DDTHH:mm")
        : "";

    const taskData = {
      title: formData.title,
      description: formData.description,
      startTime: `${formData.startDate}T${formData.startTime}`,
      endTime: `${formData.startDate}T${formData.endTime}`,
      startDate: formData.startDate,
      endDate: formData.endDate,
      frequency: formData.frequency,
      notification: formData.notification,
      notificationTime: formData.notificationTime,
      alarmTime: alarmTime,
      userId: user.id,
    };

    if (!taskData.title) {
      setWarning((prevWarning) => {
        return { ...prevWarning, title: "Title cannot be left empty!!" };
      });
      return;
    }

    if (
      new Date(taskData.startTime).getTime() >=
      new Date(taskData.endTime).getTime()
    ) {
      setWarning((prevWarning) => {
        return {
          ...prevWarning,
          startTime: "StartTime cannot be after endTime",
          endTime: "StartTime cannot be after endTime",
        };
      });

      return;
    }

    if (
      !pattern &&
      !(await handleCheck(taskData.startTime, taskData.endTime))
    ) {
      setWarning((prevWarning) => {
        return {
          ...prevWarning,
          startTime: "The period is occupied by some event!!",
          endTime: "The period is occupied by some event!!",
        };
      });

      return;
    }

    axios
      .post(
        pattern
          ? `${apiEndpoint}/pattern/create`
          : `${apiEndpoint}/todo/create`,
        taskData
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{pattern ? "Add Pattern" : "Add Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-2">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={formData.title}
            onChange={handleChange}
            name="title"
            placeholder="Enter the title"
          />
          <Form.Text className="text-danger" style={{ fontFamily: "Verdana" }}>
            {warning.title}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={formData.description}
            onChange={handleChange}
            name="description"
            placeholder="Enter the description"
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>{pattern ? "StartDate" : "Date"}</Form.Label>
          <Form.Control
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            name="startDate"
          />
        </Form.Group>
        {pattern && (
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
          <Form.Text className="text-danger" style={{ fontFamily: "Verdana" }}>
            {warning.startTime}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>EndTime</Form.Label>
          <Form.Control
            type="time"
            value={formData.endTime}
            onChange={handleChange}
            name="endTime"
          />
          <Form.Text className="text-danger" style={{ fontFamily: "Verdana" }}>
            {warning.endTime}
          </Form.Text>
        </Form.Group>
        {pattern && (
          <Form.Group className="mb-2">
            <Form.Label>Frequency</Form.Label>
            <Form.Select
              value={formData.frequency}
              onChange={handleChange}
              name="frequency"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
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
        {acceptNotification && (
          <Form.Group className="mb-2">
            <Form.Label>When to notify?</Form.Label>
            <Form.Select
              value={formData.notificationTime}
              onChange={handleChange}
              name="notificationTime"
            >
              <option value="1h">1 hour before</option>
              <option value="30min">30 min before</option>
            </Form.Select>
          </Form.Group>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Stack direction="horizontal" gap={2}>
          <Button
            variant="outline-info"
            onClick={() => {
              setPattern(!pattern);
            }}
          >
            {pattern ? "Task" : "Pattern"}
          </Button>
          <Button
            variant="outline-primary"
            onClick={async () => {
              await handleAdd();
            }}
          >
            <Stack direction="horizontal" gap={2}>
              <i className="bi bi-plus-square"></i>
              Add
            </Stack>
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
}

export default TaskForm;
