import React from "react";
import { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import Panel from "../Panel";
import dayjs from "dayjs";
import "bootstrap-icons/font/bootstrap-icons.css";

function ViewButton({ date, tasks }) {
  const [view, setView] = useState(false);
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    setView(!view);
  };

  const handleClose = () => {
    setView(false);
  };

  return (
    <>
      <i
        className={
          view
            ? "bi bi-eye-fill"
            : hover
            ? "bi bi-eye-slash-fill"
            : "bi bi-eye-slash"
        }
        onClick={handleClick}
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      ></i>
      <Offcanvas show={view} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Tasks on {date}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Panel day={dayjs(date)} tasks={tasks} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ViewButton;
