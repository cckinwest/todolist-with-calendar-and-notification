import React from "react";
import Month from "./Month";
import ExpireForm from "../ExpireForm";
import dayjs from "dayjs";
import axios from "axios";
import { Stack, Form, Container, Row, Col, Button } from "react-bootstrap";
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

  const subscribe = async () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((swReg) => {
        console.log(`A service worker is active: ${swReg.active}`);
        swReg.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC,
          })
          .then((pushSubscription) => {
            console.log(
              `The endpoint of the subscription: ${pushSubscription.endpoint}`
            );

            const userData = {
              id: user.id,
              subscription: pushSubscription,
            };

            axios.put("http://localhost:3001/user/subscribe", userData).then(
              (res) => {
                if (res.statusCode === 200) {
                  console.log("Subscribed successfully!");
                }
              },
              (err) => {
                console.log(`Error occurred: ${err}`);
              }
            );
          });
      });
    }
  };

  const notification = async () => {
    axios.get(`http://localhost:3001/user/sendNotification`).then(
      (res) => {
        if (res.statusCode === 202) {
          console.log("A message is pushed successfully!");
        }
      },
      (err) => {
        console.log(`Error occurred: ${err}`);
      }
    );
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col>
          <ExpireForm />
        </Col>
        <Col>
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
        </Col>
        <Col>
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
        </Col>
        <Col>
          <Button variant="outline-primary" onClick={subscribe}>
            Subscribe
          </Button>
        </Col>
        <Col>
          <Button variant="outline-secondary" onClick={notification}>
            Notification
          </Button>
        </Col>
      </Row>
      <Row>
        <Month year={year} month={month} tasks={tasks} />
      </Row>
    </Container>
  );
}

export default Calendar;
