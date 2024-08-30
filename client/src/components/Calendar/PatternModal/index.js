import React from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "bootstrap-icons/font/bootstrap-icons.css";

import PatternDisplay from "./PatternDisplay";
import PatternEdit from "./PatternEdit";

function PatternModal({ date, task }) {
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
    const taskData = { patternId: task._id, date: date.date };
    axios
      .put(`http://localhost:3002/pattern/deleteAnIndividual`, taskData)
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
        variant="outline-danger"
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
          <PatternEdit
            date={date}
            task={task}
            show={show}
            handleClose={handleClose}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            handleDelete={handleDelete}
          />
        ) : (
          <PatternDisplay
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

export default PatternModal;
