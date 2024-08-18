import React from "react";
import { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import DateButton from "./DateButton";
import dayjs from "dayjs";

import "bootstrap-icons/font/bootstrap-icons.css";

function WeekMenu() {
  const week = [];
  const [start, setStart] = useState(0);
  const [day, setDay] = useState(dayjs().format("DD/MM"));

  const nextWeek = () => {
    setStart(start + 7);
  };

  const prevWeek = () => {
    setStart(start - 7);
  };

  for (var i = 1; i < 8; i++) {
    week.push(
      dayjs()
        .day(start + i)
        .format("DD/MM")
    );
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
          return (
            <Col style={{ textAlign: "center" }}>
              <DateButton date={date} setDate={setDay} />
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
