import React from "react";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";

import "bootstrap-icons/font/bootstrap-icons.css";

function MonthMenu({ year, setYear, month, setMonth }) {
  const monthArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function Prev() {
    const prevMonth = () => {
      if (month > 0) {
        setMonth(month - 1);
      } else {
        setMonth(11);
        setYear(year - 1);
      }
    };

    return (
      <Button
        onClick={prevMonth}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          padding: "0",
        }}
      >
        <i className="bi bi-arrow-left" />
      </Button>
    );
  }

  function Next() {
    const nextMonth = () => {
      if (month < 11) {
        setMonth(month + 1);
      } else {
        setMonth(0);
        setYear(year + 1);
      }
    };

    return (
      <Button
        onClick={nextMonth}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          padding: "0",
        }}
      >
        <i className="bi bi-arrow-right" />
      </Button>
    );
  }

  return (
    <Container
      className="d-flex justify-content-between align-items-center mb-2"
      fluid
    >
      <Prev />
      <h1>{`${monthArr[month]}, ${year}`}</h1>
      <Next />
    </Container>
  );
}

export default MonthMenu;
