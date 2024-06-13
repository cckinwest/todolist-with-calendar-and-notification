import React from "react";
import Task from "../Task";

import { Stack } from "react-bootstrap";

const TaskList = ({ tasks }) => {
  return (
    <Stack gap={2}>
      {tasks.map((task) => {
        return (
          <Task
            taskId={task._id}
            title={task.title}
            description={task.description}
            startTime={task.startTime}
            frequency={task.frequency}
          />
        );
      })}
    </Stack>
  );
};

export default TaskList;
