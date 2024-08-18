import React from "react";
import { Button } from "react-bootstrap";

function DateButton({ date, setDate }) {
  return (
    <Button
      onClick={() => {
        setDate(date);
      }}
      variant="outline-primary"
      style={{
        height: "40px",
        width: "40px",
        padding: "0",
        borderRadius: "50%",
        fontSize: "12px",
      }}
    >
      {date}
    </Button>
  );
}

export default DateButton;
