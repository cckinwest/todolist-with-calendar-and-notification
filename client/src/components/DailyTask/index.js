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
        //console.log("Hello fetchData!");
        const resTodo = await axios.get(
          `http://localhost:3002/todo?username=${user.username}`
        );

        const arrOfTasks = resTodo.data;

        const resPattern = await axios.get(
          `http://localhost:3002/pattern?username=${user.username}`
        );

        for (var i = 0; i < resPattern.data.length; i++) {
          arrOfTasks.push(resPattern.data[i]);
        }

        setTasks(arrOfTasks);
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
