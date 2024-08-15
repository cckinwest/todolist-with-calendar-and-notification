import React from "react";
import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import DateButton from "./DateButton";

function WeekMenu() {
  const week = ["12/8", "13/8", "14/8", "15/8", "16/8", "17/8", "19/8"];
  const [day, setDay] = useState("15/8");

  return (
    <Container>
      <Row>Date clicked is {day}.</Row>
      <Row>
        {week.map((date) => {
          return (
            <Col style={{ textAlign: "center" }}>
              <DateButton date={date} setDate={setDay} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default WeekMenu;
