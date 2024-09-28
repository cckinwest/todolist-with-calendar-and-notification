import React from "react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Day from "../Day";
import { Container, Row, Button } from "react-bootstrap";

function Week({ weekArr, tasks, children }) {
  const [week, setWeek] = useState(weekArr);

  const nextWeek = () => {
    setWeek(
      week.map((day) => {
        return dayjs(day).add(7, "day").format("YYYY-MM-DD");
      })
    );
  };

  const prevWeek = () => {
    setWeek(
      week.map((day) => {
        return dayjs(day).subtract(7, "day").format("YYYY-MM-DD");
      })
    );
  };

  return (
    <Container>
      <Row>
        <Container
          className="d-flex justify-content-between align-items-center mb-2"
          fluid
        >
          <Button
            onClick={prevWeek}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              padding: "0",
            }}
          >
            <i className="bi bi-arrow-left" />
          </Button>
          <h1>{`Week (${dayjs(week[0]).format("DD/MM")}-${dayjs(week[6]).format(
            "DD/MM"
          )})`}</h1>
          <Button
            onClick={nextWeek}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              padding: "0",
            }}
          >
            <i className="bi bi-arrow-right" />
          </Button>
        </Container>
      </Row>
      {children}
      {week.map((day) => (
        <Row>
          <Day tasks={tasks} date={day} />
        </Row>
      ))}
    </Container>
  );
}

export default Week;
