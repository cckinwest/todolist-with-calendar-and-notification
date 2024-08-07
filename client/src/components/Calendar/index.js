import React from "react";
import Month from "./Month";
import NotificationStatus from "./NotificationStatus";
import ExpireForm from "../ExpireForm";
import dayjs from "dayjs";
import axios from "axios";
import { Stack, Form, Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import {
  getNotificationConsent,
  serviceWorkerRegistration,
  notificationSubscription,
} from "../../notificationManagement";

function Calendar() {
  const [year, setYear] = useState(dayjs().get("y"));
  const [month, setMonth] = useState(dayjs().get("M") + 1);

  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("default");

  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  const handlePermissionGranted = async () => {
    const registration = await serviceWorkerRegistration();
    const pushSubscription = await notificationSubscription();

    if (pushSubscription) {
      console.log(pushSubscription);

      console.log(
        `A pushSubscription obj is got with endpoint: ${pushSubscription.endpoint}`
      );

      console.log(`User id: ${user.id}`);

      try {
        const response = await axios.post(
          `http://localhost:3001/subscription/subscribe`,
          {
            id: user.id,
            subscription: pushSubscription,
          }
        );

        console.log(`Status Code: ${response}`);
        console.log(
          `Subscribed successfully with endpoint: ${pushSubscription.endpoint}`
        );
      } catch (err) {
        console.error(`There are problems in the subscription: ${err}`);
      }
    } else {
      console.error("No pushSubscription is created.");
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Hello fetchData!");
        const res = await axios.get(
          `http://localhost:3001/todo?username=${user.username}`
        );
        setTasks(res.data);
        //console.log(tasks);
      } catch (err) {
        console.error(`Invalid username: ${err}`);
      }

      const permission = await getNotificationConsent();
      setStatus(permission);

      if (Notification.permission === "granted") {
        handlePermissionGranted();
      }
    }

    fetchData();
  }, []);

  return (
    <Container>
      <Row className="mt-3 d-flex align-items-center justify-content-between">
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
          <NotificationStatus status={status} />
        </Col>
      </Row>
      <Row>
        <Month year={year} month={month} tasks={tasks} />
      </Row>
    </Container>
  );
}

export default Calendar;
