import React from "react";
import { useState } from "react";
import { Card, Stack, Container, Row, Col } from "react-bootstrap";
import TaskModal from "../TaskModal";
import AddModal from "../AddModal";
import { useMediaQuery } from "react-responsive";

function Day({ date, tasks }) {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });
  const isMediumScreen = useMediaQuery({ query: "(max-width: 1024px)" });
  const isLargeScreen = useMediaQuery({ query: "(max-width: 1440px)" });

  const onDate = (task) => {
    return task.startTime.split("T")[0] === date.date;
  };

  const checkDaily = (task) => {
    return (
      task.frequency === "daily" &&
      new Date(task.startTime).getTime() < new Date(date.date).getTime()
    );
  };

  const checkWeekly = (task) => {
    const active = new Date(date.date);

    return (
      task.frequency === "weekly" &&
      new Date(task.startDate).getTime() <= active.getTime() &&
      active.getTime() <= new Date(task.endDate).getTime() &&
      new Date(task.startDate).getDay() === active.getDay()
    );
  };

  const checkMonthly = (task) => {
    const start = new Date(task.startTime);
    const active = new Date(date.date);

    return (
      task.frequency === "monthly" &&
      start.getTime() < active.getTime() &&
      start.getDate() === active.getDate()
    );
  };

  const checkAnnually = (task) => {
    const start = new Date(task.startTime);
    const active = new Date(date.date);

    return (
      task.frequency === "monthly" &&
      start.getTime() < active.getTime() &&
      start.getDate() === active.getDate() &&
      start.getMonth() === active.getMonth()
    );
  };

  const checkExcept = (task) => {
    const active = date.date;

    return task.except ? !task.except.includes(active) : true;
  };

  const fromOldToNew = (task1, task2) => {
    if (
      new Date(task1.startTime).getHours() !==
      new Date(task2.startTime).getHours()
    ) {
      return (
        new Date(task1.startTime).getHours() -
        new Date(task2.startTime).getHours()
      );
    } else {
      return (
        new Date(task1.startTime).getMinutes() -
        new Date(task2.startTime).getMinutes()
      );
    }
  };
  /*
  const arrOfTasks = tasks
    .filter(
      (task) =>
        (onDate(task) ||
          checkDaily(task) ||
          checkWeekly(task) ||
          checkMonthly(task) ||
          checkAnnually(task)) &&
        checkExcept(task)
    )
    .sort(fromOldToNew);*/

  const arrOfTasks = tasks
    .filter((task) => (onDate(task) || checkWeekly(task)) && checkExcept(task))
    .sort(fromOldToNew);

  return (
    <Card
      style={{
        width: "100%",
        height: isSmallScreen ? "auto" : "13vh",
        minHeight: "13vh",
      }}
      className={date.status === "past" && "opacity-25"}
    >
      <Card.Body key={date.date} style={{ overflow: "hidden" }}>
        <Card.Title className="d-flex justify-content-between">
          {date.date.split("-")[2]}/{date.date.split("-")[1]}
          <AddModal date={date} />
        </Card.Title>
        {isSmallScreen || arrOfTasks.length <= 2 ? (
          <Container>
            {arrOfTasks.map((task) => {
              return (
                <Row className="mb-1">
                  <TaskModal date={date} task={task} key={task._id} />
                </Row>
              );
            })}
          </Container>
        ) : (
          <Container>
            <Row style={{ textAlign: "left" }}>
              {arrOfTasks.map((task) => {
                return (
                  <Col
                    className="mb-1"
                    style={{ padding: "0", width: "calc(100%/3)" }}
                  >
                    <TaskModal
                      date={date}
                      task={task}
                      showTitle={false}
                      key={task._id}
                    />
                  </Col>
                );
              })}
            </Row>
          </Container>
        )}
      </Card.Body>
    </Card>
  );
}

export default Day;
