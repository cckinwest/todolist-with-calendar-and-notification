import React from "react";
import Hourline from "./Hourline";
import TaskShade from "../TaskShade";

function Panel() {
  const arrOfHours = [];

  const task = {
    title: "Learn React",
    description: "Make a stupid to-do-list app",
    startTime: "2024-08-18T17:30",
    endTime: "2024-08-18T21:15",
    frequency: "none",
  };

  for (var i = 1; i < 24; i++) {
    arrOfHours.push(i);
  }

  return (
    <div
      style={{
        height: "96vh",
        position: "relative",
        backgroundColor: "lightblue",
        padding: "0",
      }}
    >
      {arrOfHours.map((hour) => {
        return <Hourline key={hour} hour={hour} />;
      })}
      <TaskShade task={task} />
    </div>
  );
}

export default Panel;
