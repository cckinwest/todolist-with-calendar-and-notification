import React from "react";
import { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import DateButton from "./DateButton";
import dayjs from "dayjs";

import "bootstrap-icons/font/bootstrap-icons.css";

function WeekMenu({ day, setDay, tasks }) {
  const week = [];

  const nextWeek = () => {
    setDay(dayjs(day).add(7, "day"));
  };

  const prevWeek = () => {
    setDay(dayjs(day).add(-7, "day"));
  };

  const onDate = (task, date) => {
    const startDate = dayjs(task.startTime).format("YYYY-MM-DD");
    const formattedDate = dayjs(date).format("YYYY-MM-DD");

    return startDate === formattedDate;
  };

  const checkWeekly = (task, date) => {
    const active = new Date(date);
    console.log(active);

    return (
      task.frequency === "weekly" &&
      new Date(task.startDate).getTime() <= active.getTime() &&
      active.getTime() <= new Date(task.endDate).getTime() &&
      new Date(task.startDate).getDay() === active.getDay()
    );
  };

  const checkExcept = (task, date) => {
    const active = dayjs(date).format("YYYY-MM-DD");

    return task.except ? !task.except.includes(active) : true;
  };

  for (var i = 0; i < 7; i++) {
    const d = dayjs(day).get("d");
    if (d !== 0) {
      week.push(dayjs(day).add(i - d + 1, "day"));
    } else {
      week.push(dayjs(day).add(i - 6, "day"));
    }
  }
  return (
    <Container style={{ paddingTop: "5px", paddingBottom: "5px" }}>
      <Row className="d-flex justify-content-center align-items-center">
        <Col style={{ textAlign: "center" }}>
          <Button onClick={prevWeek}>
            <i className="bi bi-arrow-left" />
          </Button>
        </Col>
        {week.map((date) => {
          console.log(
            tasks.filter(
              (task) =>
                (onDate(task, date) || checkWeekly(task, date)) &&
                checkExcept(task, date)
            )
          );
          return (
            <Col style={{ textAlign: "center" }}>
              <DateButton
                date={date}
                setDay={setDay}
                active={date.get("d") === day.get("d")}
                occupied={
                  tasks.filter(
                    (task) =>
                      (onDate(task, date) || checkWeekly(task, date)) &&
                      checkExcept(task, date)
                  ).length
                }
              />
            </Col>
          );
        })}
        <Col style={{ textAlign: "center" }}>
          <Button onClick={nextWeek}>
            <i className="bi bi-arrow-right" />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default WeekMenu;
