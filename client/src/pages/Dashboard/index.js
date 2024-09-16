import React from "react";
import TaskList from "../../components/TaskList";
import TaskForm from "../../components/TaskForm";
import Notification from "../../components/Notification";

import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { Container, Row, Button } from "react-bootstrap";
import dayjs from "dayjs";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(false);

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
        <Row style={{ padding: "12px" }}>
          <Button
            variant="outline-info"
            onClick={() => {
              setShow(true);
            }}
          >
            Add
          </Button>
          {show && <TaskForm show={show} setShow={setShow} />}
        </Row>
        <Row>
          <TaskList tasks={tasks} />
        </Row>
      </Container>
    </main>
  );
}

export default Dashboard;
