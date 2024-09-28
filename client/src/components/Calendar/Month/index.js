import React from "react";
import { useMediaQuery } from "react-responsive";
import Day from "../Day";
import { Stack, Container, Row, Col } from "react-bootstrap";
import dayjs from "dayjs";

function Month({ year, month, tasks }) {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });
  const isMediumScreen = useMediaQuery({ query: "(max-width: 1024px)" });
  const isLargeScreen = useMediaQuery({ query: "(max-width: 1440px)" });

  function isLeap(y) {
    if (y % 4 === 0 && y % 100 !== 0) {
      return true;
    }

    return false;
  }

  function numOfDays(y, m) {
    const numberOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const numberOfDaysLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (isLeap(y)) {
      return numberOfDaysLeap[m];
    }

    return numberOfDays[m];
  }

  function ArrOfDays(y, m) {
    let arr = [];
    let num = numOfDays(y, m);
    for (var i = 0; i < num; i++) {
      let date = `${y}-${m + 1}-${i + 1}`;
      arr.push(dayjs(date).format("YYYY-MM-DD"));
    }

    let firstOfMonth = dayjs(`${y}-${m + 1}-1`).get("d");

    if (firstOfMonth === 0) {
      firstOfMonth = 7;
    }

    for (var i = 1; i < firstOfMonth; i++) {
      arr.unshift(
        dayjs(`${y}-${m + 1}-1`)
          .subtract(i, "d")
          .format("YYYY-MM-DD")
      );
    }

    return arr;
  }

  const dates = ArrOfDays(year, month);
  const weekdays = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

  return (
    <div style={{ marginBottom: "10px" }}>
      <Container>
        <Row>
          {!isLargeScreen &&
            weekdays.map((weekday) => {
              return (
                !isSmallScreen && (
                  <Col style={{ textAlign: "center" }} key={weekday}>
                    {weekday}
                  </Col>
                )
              );
            })}
        </Row>
        <Row>
          {dates.map((date) => {
            return (
              <Col
                key={date.date}
                style={{
                  textAlign: "center",
                  flex: `0 0 ${
                    isLargeScreen
                      ? isMediumScreen
                        ? isSmallScreen
                          ? "100%"
                          : "calc(100%/3)"
                        : "calc(100%/5)"
                      : "calc(100%/7)"
                  }`,
                  padding: "0",
                }}
              >
                <Day date={date} tasks={tasks} key={date} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default Month;
