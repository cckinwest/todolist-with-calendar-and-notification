import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Task = ({ taskId, title, description }) => {
  const [tasktitle, setTasktitle] = useState(title);
  const [taskdescription, setTaskdescription] = useState(description);

  const handleDelete = () => {
    const taskData = { taskId: taskId };
    console.log(taskData);

    axios
      .put("http://localhost:3001/todo/delete", taskData)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ backgroundColor: "yellow", marginBottom: "5px" }}>
      <h4>Title: {tasktitle}</h4>
      <p>Description: {taskdescription}</p>
      <button>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Task;
