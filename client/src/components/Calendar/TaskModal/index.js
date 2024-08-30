import React from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "bootstrap-icons/font/bootstrap-icons.css";

import TaskDisplay from "./TaskDisplay";
import TaskEdit from "./TaskEdit";

function TaskModal({ date, task }) {
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

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

  const handleDelete = () => {
    const taskData = { taskId: task._id };
    axios
      .put(`http://localhost:3002/todo/delete`, taskData)
      .then((res) => {
        handleClose();
        window.location.assign("/calendar");
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
        {`${dayjs(task.startTime).format("HH:mm")} ${handleString(task.title)}`}
      </Button>

      {show &&
        (isEdit ? (
          <TaskEdit
            date={date}
            task={task}
            show={show}
            handleClose={handleClose}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            handleDelete={handleDelete}
          />
        ) : (
          <TaskDisplay
            task={task}
            show={show}
            handleClose={handleClose}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            handleDelete={handleDelete}
          />
        ))}
    </>
  );
}

export default TaskModal;
