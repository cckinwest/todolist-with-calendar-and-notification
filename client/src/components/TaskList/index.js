import React from "react";
import Task from "../Task";

const TaskList = ({ tasks }) => {
  return (
    <ul className="taskList">
      {tasks.map((task) => {
        return (
          <li>
            <Task task={task} />
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;
