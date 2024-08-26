import React from "react";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import "bootstrap-icons/font/bootstrap-icons.css";
import TaskForm from "./TaskForm";
import PatternForm from "./PatternForm";

function AddModal({ date }) {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  const [show, setShow] = useState(false);
  const [hoverAdd, setHoverAdd] = useState(false);

  const [taskType, setTaskType] = useState("Todo");

  const handleClose = () => {
    setShow(false);
  };

  const handleChangeType = () => {
    if (taskType === "Todo") {
      setTaskType("Pattern");
    } else {
      setTaskType("Todo");
    }
  };

  const handleAdd = () => {
    if (date.status === "current") {
      setShow(true);
    }
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

      {show &&
        (taskType === "Todo" ? (
          <TaskForm
            date={date}
            show={show}
            setShow={setShow}
            handleClose={handleClose}
            handleChangeType={handleChangeType}
            taskType={taskType}
            userId={user.id}
          />
        ) : (
          <PatternForm
            date={date}
            show={show}
            setShow={setShow}
            handleClose={handleClose}
            handleChangeType={handleChangeType}
            taskType={taskType}
            userId={user.id}
          />
        ))}
    </>
  );
}

export default AddModal;
