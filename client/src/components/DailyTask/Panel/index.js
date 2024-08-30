import React from "react";
import Hourline from "./Hourline";
import TaskShade from "../TaskShade";
import dayjs from "dayjs";
import "bootstrap-icons/font/bootstrap-icons.css";

function Panel({ day, tasks }) {
  const arrOfHours = [];

  for (var i = 1; i < 24; i++) {
    arrOfHours.push(i);
  }

  const onDate = (task) => {
    const startDate = dayjs(task.startTime).format("YYYY-MM-DD");
    const formattedDate = dayjs(day).format("YYYY-MM-DD");

    return startDate === formattedDate;
  };

  const checkWeekly = (task) => {
    const active = new Date(day);

    return (
      task.frequency === "weekly" &&
      new Date(task.startDate).getTime() <= active.getTime() &&
      active.getTime() <= new Date(task.endDate).getTime() &&
      new Date(task.startDate).getDay() === active.getDay()
    );
  };

  const checkExcept = (task) => {
    const active = day.format("YYYY-MM-DD");

    return task.except ? !task.except.includes(active) : true;
  };

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
      {tasks
        .filter(
          (task) => (onDate(task) || checkWeekly(task)) && checkExcept(task)
        )
        .map((task) => {
          return <TaskShade task={task} key={`taskshade-${task._id}`} />;
        })}
    </div>
  );
}

export default Panel;
