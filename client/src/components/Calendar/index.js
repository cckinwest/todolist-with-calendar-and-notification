import React from "react";
import Month from "./Month";
import dayjs from "dayjs";
import axios from "axios";
import { Stack, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function Calendar() {
  const [year, setYear] = useState(dayjs().get("y"));
  const [month, setMonth] = useState(dayjs().get("M") + 1);

  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/todo?username=${user.username}`)
      .then((res) => {
        setTasks(res.data);
        console.log(tasks);
      });
  }, []);

  return (
    <div>
      <Stack direction="horizontal" gap={3} className="mt-3">
        <Form.Control
          type="number"
          name="year"
          id="year"
          min="2000"
          max="2049"
          value={year}
          onChange={(e) => {
            const y = parseInt(e.target.value);
            setYear(y);
          }}
        />
        <Form.Control
          type="number"
          name="month"
          id="month"
          min="1"
          max="12"
          value={month}
          onChange={(e) => {
            const m = parseInt(e.target.value);
            setMonth(m);
          }}
        />
      </Stack>
      <Month year={year} month={month} tasks={tasks} />
    </div>
  );
}

export default Calendar;
