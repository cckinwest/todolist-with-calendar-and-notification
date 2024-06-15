import React from "react";
import Task from "../Task";

import { Stack, Card } from "react-bootstrap";

const TaskList = ({ tasks, showAll, dateSelected }) => {
  function onDate(taskInput) {
    return taskInput.startTime.split("T")[0] === dateSelected;
  }

  const tasksLength = tasks.filter(onDate).length;

  return showAll ? (
    <Stack gap={2}>
      {tasks.map((task) => {
        return (
          <Task
            taskId={task._id}
            title={task.title}
            description={task.description}
            startTime={task.startTime}
            frequency={task.frequency}
            key={task._id}
          />
        );
      })}
    </Stack>
  ) : tasksLength > 0 ? (
    <Stack gap={2}>
      {tasks.filter(onDate).map((task) => {
        return (
          <Task
            taskId={task._id}
            title={task.title}
            description={task.description}
            startTime={task.startTime}
            frequency={task.frequency}
            key={task._id}
          />
        );
      })}
    </Stack>
  ) : (
    <Card className="border border-1 rounded-3 bg-light bg-gradient p-2">
      <Card.Body>
        <Card.Text>No Tasks on {dateSelected}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TaskList;
