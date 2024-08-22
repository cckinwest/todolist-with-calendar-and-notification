import React from "react";
import { Button } from "react-bootstrap";

function DateButton({ date, setDay, active, occupied }) {
  return (
    <Button
      onClick={() => {
        setDay(date);
      }}
      variant={
        active
          ? occupied
            ? "danger"
            : "outline-danger"
          : occupied
          ? "primary"
          : "outline-primary"
      }
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
