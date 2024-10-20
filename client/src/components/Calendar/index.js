import React from "react";
import Month from "./Month";
import MonthMenu from "./MonthMenu";
import Week from "./Week";
import dayjs from "dayjs";
import axios from "axios";
import { Stack, Form, Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Notification from "../Notification";
import { useMediaQuery } from "react-responsive";
import LoginModal from "../LoginModal";

import {
  getNotificationConsent,
  serviceWorkerRegistration,
  notificationSubscription,
} from "../../notificationManagement";

function Calendar() {
  const [year, setYear] = useState(dayjs().get("y"));
  const [month, setMonth] = useState(dayjs().get("M"));

  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("default");

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : "";

  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });
  const isMediumScreen = useMediaQuery({ query: "(max-width: 1024px)" });
  const isLargeScreen = useMediaQuery({ query: "(max-width: 1440px)" });

  const apiEndpoint = process.env.REACT_APP_URL || "http://localhost:3002";

  const thisWeek = () => {
    const weekArr = [];

    if (dayjs().day() != 0) {
      for (let i = 1; i < 8; i++) {
        weekArr.push(dayjs().day(i).format("YYYY-MM-DD"));
      }
    } else {
      for (let i = 1; i < 8; i++) {
        weekArr.push(dayjs().day(i).subtract(7, "day").format("YYYY-MM-DD"));
      }
    }

    return weekArr;
  };

  const handlePermissionGranted = async () => {
    //const registration = await serviceWorkerRegistration();
    console.log("Hello!");
    await serviceWorkerRegistration();
    const pushSubscription = await notificationSubscription();

    if (pushSubscription) {
      console.log(pushSubscription);

      console.log(
        `A pushSubscription obj is got with endpoint: ${pushSubscription.endpoint}`
      );

      console.log(`User id: ${user.id}`);

      try {
        const response = await axios.post(
          `${apiEndpoint}/subscription/subscribe`,
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
        const resTodo = await axios.get(
          `${apiEndpoint}/todo?username=${user.username}`
        );

        const resPattern = await axios.get(
          `${apiEndpoint}/pattern?username=${user.username}`
        );

        setTasks([...resTodo.data, ...resPattern.data]);
      } catch (err) {
        console.error(`Invalid username: ${err}`);
      }

      const permission = await getNotificationConsent();
      console.log(permission);

      if (permission === "granted") {
        console.log("Hello");
        await handlePermissionGranted();
      }
    }

    token && fetchData();
  }, []);

  return token ? (
    isSmallScreen ? (
      <Week weekArr={thisWeek()} tasks={tasks}>
        <Notification tasks={tasks} />
      </Week>
    ) : (
      <Container>
        <Notification tasks={tasks} />
        <Row className="mt-3 d-flex align-items-center justify-content-between">
          <MonthMenu
            year={year}
            setYear={setYear}
            month={month}
            setMonth={setMonth}
          />
        </Row>
        <Row>
          <Month year={year} month={month} tasks={tasks} />
        </Row>
      </Container>
    )
  ) : (
    <LoginModal />
  );
}

export default Calendar;
