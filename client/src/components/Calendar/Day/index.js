import React from "react";
import { useState } from "react";
import { Card, Stack, Badge, Button } from "react-bootstrap";
import TaskModal from "../TaskModal";

function Day({ date, tasks }) {
  const onDate = (task) => {
    return task.startTime.split("T")[0] === date.date;
  };

  return (
    <Card
      style={{ width: "14%", height: "14vh" }}
      className={date.status === "past" && "bg-secondary"}
    >
      <Card.Body key={date.date}>
        <Card.Title>
          {date.date.split("-")[2]}/{date.date.split("-")[1]}
        </Card.Title>
        <Stack gap={1}>
          {tasks.filter(onDate).map((task) => {
            return <TaskModal task={task} />;
          })}
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default Day;
