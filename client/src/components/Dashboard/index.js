import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import TaskList from "../TaskList";
import TaskForm from "../TaskForm";
import TokenCounter from "../TokenCounter";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/todo?username=${user.username}`)
      .then((res) => {
        setTasks(res.data);
      });
  }, []);

  return (
    <div>
      <TokenCounter />
      <TaskList tasks={tasks} />
      <TaskForm />
    </div>
  );
}

export default Dashboard;
