import React from "react";
import ExpireForm from "../../components/ExpireForm";
import TaskList from "../../components/TaskList";
import TaskForm from "../../components/TaskForm";

import dayjs from "dayjs";

import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [startDate, setStartDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [showAll, setShowAll] = useState(true);

  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  useEffect(() => {
    const fetchData = async () => {
      const todos = await axios.get(
        `http://localhost:3002/todo?username=${user.username}`
      );
      const patterns = await axios.get(
        `http://localhost:3002/pattern?username=${user.username}`
      );

      setTasks([...todos.data, ...patterns.data]);
    };

    fetchData();
  }, []);

  return (
    <main>
      <Container fluid>
        <Row>
          <TaskList tasks={tasks} />
        </Row>
      </Container>
    </main>
  );
}

export default Dashboard;
