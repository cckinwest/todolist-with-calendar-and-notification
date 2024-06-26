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
        <Row className="d-flex align-items-center justify-content-center">
          <Col className="d-flex justify-content-start">
            <ExpireForm />
          </Col>
          <Col>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setShowAll(false);
              }}
            />
          </Col>
          <Col className="d-flex justify-content-end">
            <Button
              variant="outline-success"
              onClick={() => {
                setShowAll(true);
              }}
            >
              Show All Task
            </Button>
          </Col>
        </Row>
        <Row>
          <TaskList tasks={tasks} showAll={showAll} dateSelected={startDate} />
        </Row>
        <Row>
          <TaskForm />
        </Row>
      </Container>
    </main>
  );
}

export default Dashboard;
