import React from "react";
import { useState } from "react";
import { Card, Stack, Badge, Button } from "react-bootstrap";
import TaskModal from "../TaskModal";
import PatternModal from "../PatternModal";
import AddModal from "../AddModal";

function Day({ date, tasks }) {
  const onDate = (task) => {
    return task.startTime.split("T")[0] === date.date;
  };

  const checkDaily = (task) => {
    return (
      task.frequency === "daily" &&
      new Date(task.startTime).getTime() < new Date(date.date).getTime()
    );
  };

  const checkWeekly = (task) => {
    const start = new Date(task.startTime);
    const active = new Date(date.date);

    return (
      task.frequency === "weekly" &&
      start.getTime() < active.getTime() &&
      active.getTime() <= new Date(task.endDate).getTime() &&
      start.getDay() === active.getDay()
    );
  };

  const checkMonthly = (task) => {
    const start = new Date(task.startTime);
    const active = new Date(date.date);

    return (
      task.frequency === "monthly" &&
      start.getTime() < active.getTime() &&
      start.getDate() === active.getDate()
    );
  };

  const checkAnnually = (task) => {
    const start = new Date(task.startTime);
    const active = new Date(date.date);

    return (
      task.frequency === "monthly" &&
      start.getTime() < active.getTime() &&
      start.getDate() === active.getDate() &&
      start.getMonth() === active.getMonth()
    );
  };

  const checkExcept = (task) => {
    const active = date.date;

    return task.except ? !task.except.includes(active) : true;
  };

  const fromOldToNew = (task1, task2) => {
    if (
      new Date(task1.startTime).getHours() !==
      new Date(task2.startTime).getHours()
    ) {
      return (
        new Date(task1.startTime).getHours() -
        new Date(task2.startTime).getHours()
      );
    } else {
      return (
        new Date(task1.startTime).getMinutes() -
        new Date(task2.startTime).getMinutes()
      );
    }
  };
  /*
  const arrOfTasks = tasks
    .filter(
      (task) =>
        (onDate(task) ||
          checkDaily(task) ||
          checkWeekly(task) ||
          checkMonthly(task) ||
          checkAnnually(task)) &&
        checkExcept(task)
    )
    .sort(fromOldToNew);*/

  const arrOfTasks = tasks
    .filter((task) => (onDate(task) || checkWeekly(task)) && checkExcept(task))
    .sort(fromOldToNew);

  return (
    <Card
      style={{ width: "100%", height: "13vh" }}
      className={date.status === "past" && "opacity-25"}
    >
      <Card.Body key={date.date} style={{ overflow: "hidden" }}>
        <Card.Title className="d-flex justify-content-between">
          {date.date.split("-")[2]}/{date.date.split("-")[1]}
          <AddModal date={date} />
        </Card.Title>
        <Stack gap={1}>
          {arrOfTasks.map((task) => {
            return task.startDate ? (
              <PatternModal date={date} task={task} key={task._id} />
            ) : (
              <TaskModal date={date} task={task} key={task._id} />
            );
          })}
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default Day;
