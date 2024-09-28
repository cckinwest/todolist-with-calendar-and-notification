import React from "react";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import "bootstrap-icons/font/bootstrap-icons.css";
//import TaskForm from "./TaskForm";
//import PatternForm from "./PatternForm";
import TaskForm from "../../TaskForm";

function AddModal({ date }) {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  const [show, setShow] = useState(false);
  const [hoverAdd, setHoverAdd] = useState(false);

  const handleAdd = () => {
    setShow(true);
  };

  return (
    <>
      <i
        className={hoverAdd ? "bi bi-plus-circle-fill" : "bi bi-plus-circle"}
        onClick={handleAdd}
        onMouseEnter={() => {
          setHoverAdd(true);
        }}
        onMouseLeave={() => {
          setHoverAdd(false);
        }}
        style={{ marginLeft: "2px" }}
      ></i>

      {show && <TaskForm show={show} setShow={setShow} date={date} />}
    </>
  );
}

export default AddModal;
