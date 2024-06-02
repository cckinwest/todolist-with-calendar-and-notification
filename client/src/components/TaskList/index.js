import React from "react";
import Task from "../Task";

import { ListGroup } from "react-bootstrap";

const TaskList = ({ tasks }) => {
  return (
    <ListGroup variant="flush">
      {tasks.map((task) => {
        return (
          <ListGroup.Item key={task._id}>
            <Task
              taskId={task._id}
              title={task.title}
              description={task.description}
            />
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default TaskList;
