import React from "react";
import { useState } from "react";
import { Card, Stack, Container, Row, Col } from "react-bootstrap";
import TaskModal from "../TaskModal";
import AddModal from "../AddModal";
import ViewButton from "../ViewButton";
import { useMediaQuery } from "react-responsive";
import dayjs from "dayjs";
import "bootstrap-icons/font/bootstrap-icons.css";

function Day({ date, tasks }) {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });
  const isMediumScreen = useMediaQuery({ query: "(max-width: 1024px)" });
  const isLargeScreen = useMediaQuery({ query: "(max-width: 1440px)" });

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

  const arrOfTasks = tasks
    .filter((task) => task.dates.includes(date))
    .sort(fromOldToNew);

  return (
    <Card
      style={{
        width: "100%",
        height: isSmallScreen ? "auto" : "13vh",
        minHeight: "13vh",
      }}
      className={date === dayjs().format("YYYY-MM-DD") && "text-bg-warning"}
    >
      <Card.Body key={date} style={{ overflow: "hidden" }}>
        <Card.Title className="d-flex justify-content-between">
          {dayjs(date).format("DD/MM")}
          <Stack direction="horizontal">
            <ViewButton date={date} tasks={tasks} />
            <AddModal date={date} />
          </Stack>
        </Card.Title>
        {isSmallScreen || arrOfTasks.length <= 2 ? (
          <Container>
            {arrOfTasks.map((task) => {
              return (
                <Row className="mb-1" key={task._id}>
                  <TaskModal date={date} task={task} />
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
                    key={task._id}
                  >
                    <TaskModal date={date} task={task} showTitle={false} />
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
