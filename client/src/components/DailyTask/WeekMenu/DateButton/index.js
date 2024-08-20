import React from "react";
import { Button } from "react-bootstrap";

function DateButton({ date, setDay, active }) {
  return (
    <Button
      onClick={() => {
        setDay(date);
      }}
      variant={active ? "outline-danger" : "outline-primary"}
      style={{
        height: "40px",
        width: "40px",
        padding: "0",
        borderRadius: "50%",
        fontSize: "12px",
      }}
    >
      {date.format("DD/MM")}
    </Button>
  );
}

export default DateButton;
