import React from "react";
import Task from "../Task";

const TaskList = ({ tasks }) => {
  return (
    <ul className="taskList">
      {tasks.map((taskId) => {
        return (
          <li key={taskId}>
            <Task taskId={taskId} />
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;
