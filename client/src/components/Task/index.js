import React from "react";

const Task = ({ task }) => {
  return (
    <div style={{ backgroundColor: "yellow", marginBottom: "5px" }}>
      <h4>Name: {task.name}</h4>
      <p>Description: {task.description}</p>
      <p>
        Priority:{" "}
        {task.priority === "high" ? (
          <span style={{ color: "red" }}>HIGH</span>
        ) : (
          <span style={{ color: "green" }}>LOW</span>
        )}
      </p>
    </div>
  );
};

export default Task;
