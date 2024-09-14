import React from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";
import dayjs from "dayjs";
import "bootstrap-icons/font/bootstrap-icons.css";

import TaskDisplay from "./TaskDisplay";

function TaskModal({ date, task, showTitle = true }) {
  const [show, setShow] = useState(false);

  const handleString = (str) => {
    if (str.length > 18) {
      return `${str.slice(0, 15)}...`;
    }

    return str;
  };

  const handleClick = () => {
    setShow(true);
  };

  return (
    <>
      <Button
        variant={task.startDate ? "outline-danger" : "outline-primary"}
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
        {showTitle
          ? `${dayjs(task.startTime).format("HH:mm")} ${handleString(
              task.title
            )}`
          : dayjs(task.startTime).format("HH:mm")}
      </Button>

      {show && <TaskDisplay task={task} show={show} setShow={setShow} />}
    </>
  );
}

export default TaskModal;
