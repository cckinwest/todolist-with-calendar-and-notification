import React from "react";
import { useState } from "react";
import { Card, Stack, Badge, Button } from "react-bootstrap";
import TaskModal from "../TaskModal";
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

  const fromOldToNew = (task1, task2) => {
    return (
      new Date(task1.startTime).getTime() - new Date(task2.startTime).getTime()
    );
  };

  const arrOfTasks = tasks
    .filter(
      (task) =>
        onDate(task) ||
        checkDaily(task) ||
        checkWeekly(task) ||
        checkMonthly(task) ||
        checkAnnually(task)
    )
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
            return <TaskModal date={date} task={task} key={task._id} />;
          })}
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default Day;
