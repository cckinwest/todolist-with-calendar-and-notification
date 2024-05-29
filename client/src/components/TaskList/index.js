import React from "react";
import Task from "../Task";

const TaskList = ({ tasks }) => {
  return (
    <ul className="taskList">
      {tasks.map((task) => {
        return (
          <li key={task._id}>
            <Task
              taskId={task._id}
              title={task.title}
              description={task.description}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;
