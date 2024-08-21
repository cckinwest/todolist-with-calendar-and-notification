import React from "react";
import Hourline from "./Hourline";
import TaskShade from "../TaskShade";
import "bootstrap-icons/font/bootstrap-icons.css";

function Panel({ day, tasks }) {
  const arrOfHours = [];

  for (var i = 1; i < 24; i++) {
    arrOfHours.push(i);
  }

  return (
    <div
      style={{
        height: "96vh",
        position: "relative",
        padding: "0",
        marginBottom: "10px",
      }}
      className="bg-light"
    >
      {arrOfHours.map((hour) => {
        return <Hourline key={hour} hour={hour} />;
      })}
      {tasks.map((task) => {
        return <TaskShade task={task} />;
      })}
    </div>
  );
}

export default Panel;
