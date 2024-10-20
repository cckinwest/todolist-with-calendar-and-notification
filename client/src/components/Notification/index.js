import React from "react";
import { useState, useEffect, Fragment } from "react";
import { Modal, Form, Button, Row } from "react-bootstrap";
import dayjs from "dayjs";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Single({ task }) {
  const apiEndpoint = process.env.REACT_APP_URL || "http://localhost:3002";

  const [show, setShow] = useState(false);

  const startTime = dayjs(task.startTime).format("HH:mm");
  const endTime = dayjs(task.endTime).format("HH:mm");

  setInterval(() => {
    const isPattern = task.frequency ? true : false;

    const taskStart = isPattern
      ? dayjs(
          `${dayjs().format("YYYY-MM-DD")}T${dayjs(task.startTime).format(
            "HH:mm"
          )}`
        )
      : dayjs(task.startTime);

    const today = dayjs().format("YYYY-MM-DD");
    const now = dayjs();

    task.alarmTime &&
      task.notification &&
      dayjs(task.alarmTime).format("YYYY-MM-DD") === today &&
      dayjs(task.alarmTime).diff(now) <= 0 &&
      now.diff(taskStart) <= 0 &&
      setShow(true);
  }, 1000);

  const handleNotNotify = async () => {
    const isPattern = task.frequency ? true : false;

    await axios
      .put(
        isPattern
          ? `${apiEndpoint}/pattern/changeAnIndividual`
          : `${apiEndpoint}/todo/update`,
        {
          id: task._id,
          title: task.title,
          description: task.description,
          notificationTime: task.notificationTime,
          createdBy: task.createdBy,
          notification: false,
          startTime: `${dayjs().format("YYYY-MM-DD")}T${dayjs(
            task.startTime
          ).format("HH:mm")}`,
          endTime: `${dayjs().format("YYYY-MM-DD")}T${dayjs(
            task.endTime
          ).format("HH:mm")}`,
          date: dayjs().format("YYYY-MM-DD"),
          patternId: task._id,
        }
      )
      .catch((err) => {
        console.log(err);
      });

    setShow(false);
    window.location.reload();
  };

  const handleNotifyAgain = async () => {
    const isPattern = task.frequency ? true : false;

    const todayStart = `${dayjs().format("YYYY-MM-DD")}T${dayjs(
      task.startTime
    ).format("HH:mm")}`;

    await axios.put(
      isPattern
        ? `${apiEndpoint}/pattern/changeAnIndividual`
        : `${apiEndpoint}/todo/update`,
      {
        id: task._id,
        patternId: task._id,
        title: task.title,
        description: task.description,
        notificationTime: task.notificationTime,
        createdBy: task.createdBy,

        alarmTime:
          dayjs(todayStart).diff(dayjs().add(5, "minute")) > 0
            ? dayjs().add(5, "minute").format("YYYY-MM-DDTHH:mm")
            : dayjs(todayStart).format("YYYY-MM-DDTHH:mm"),
        startTime: `${dayjs().format("YYYY-MM-DD")}T${dayjs(
          task.startTime
        ).format("HH:mm")}`,
        endTime: `${dayjs().format("YYYY-MM-DD")}T${dayjs(task.endTime).format(
          "HH:mm"
        )}`,
        notification: task.notification,
        startDate: task.startDate,
        endDate: task.endDate,
        frequency: task.frequency,

        date: dayjs().format("YYYY-MM-DD"),
      }
    );

    setShow(false);
    window.location.reload();
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
      }}
      key={task._id}
    >
      <Modal.Header>
        <h4>{`${task.title} (${startTime} - ${endTime})`}</h4>
      </Modal.Header>
      <Modal.Body>{task.description}</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={handleNotNotify}>
          Don't notify again
        </Button>
        <Button variant="outline-success" onClick={handleNotifyAgain}>
          Pls notify again 5 min later
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Notification({ tasks }) {
  return (
    <>
      {tasks.map((task) => {
        return <Single task={task} key={task._id} />;
      })}
    </>
  );
}

export default Notification;
