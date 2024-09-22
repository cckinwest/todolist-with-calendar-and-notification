import React from "react";
import Hourline from "./Hourline";
import TaskShade from "./TaskShade";
import dayjs from "dayjs";
import "bootstrap-icons/font/bootstrap-icons.css";

function Panel({ day, tasks }) {
  const arrOfHours = [];
  const activeDate = dayjs(day).format("YYYY-MM-DD");

  for (var i = 1; i < 24; i++) {
    arrOfHours.push(i);
  }

  return (
    <div
      style={{
        height: "120vh",
        position: "relative",
        padding: "0",
        marginBottom: "10px",
      }}
      className="bg-light"
    >
      {arrOfHours.map((hour) => {
        return <Hourline key={hour} hour={hour} />;
      })}
      {tasks
        .filter((task) => task.dates.includes(activeDate))
        .map((task) => {
          return <TaskShade task={task} key={`taskshade-${task._id}`} />;
        })}
    </div>
  );
}

export default Panel;
