import React from "react";
import ExpireForm from "../../components/ExpireForm";
import TaskList from "../../components/TaskList";
import TaskForm from "../../components/TaskForm";

import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { Container, Row, Col } from "react-bootstrap";

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
    <main>
      <Container
        style={{
          height: "80vh",
        }}
        fluid
      >
        <Row>
          <ExpireForm />
        </Row>
        <Row>
          <TaskList tasks={tasks} />
        </Row>
        <Row>
          <TaskForm />
        </Row>
      </Container>
    </main>
  );
}

export default Dashboard;
