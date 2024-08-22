import React from "react";
import { useState, useEffect } from "react";
import Panel from "./Panel";
import WeekMenu from "./WeekMenu";
import { Container, Row, Col } from "react-bootstrap";
import dayjs from "dayjs";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function DailyTask() {
  const [day, setDay] = useState(dayjs());
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Hello fetchData!");
        const res = await axios.get(
          `http://localhost:3002/todo?username=${user.username}`
        );
        setTasks(res.data);
      } catch (err) {
        console.error(`Invalid username: ${err}`);
      }
    }

    fetchData();
  }, [day]);

  return (
    <Container>
      <Row>
        <WeekMenu day={day} setDay={setDay} tasks={tasks} />
      </Row>
      <Row>
        <Panel day={day} tasks={tasks} />
      </Row>
    </Container>
  );
}

export default DailyTask;
