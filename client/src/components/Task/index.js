import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Task = ({ taskId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/todo/task?id=${taskId}`).then((res) => {
      setTitle(res.data.title);
      setDescription(res.data.description);
    });
  }, []);

  return (
    <div style={{ backgroundColor: "yellow", marginBottom: "5px" }}>
      <h4>Title: {title}</h4>
      <p>Description: {description}</p>
    </div>
  );
};

export default Task;
