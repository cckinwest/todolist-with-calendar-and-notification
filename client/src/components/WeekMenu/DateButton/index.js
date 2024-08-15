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
        height: "50px",
        width: "50px",
        padding: "0",
        borderRadius: "50%",
      }}
    >
      {date}
    </Button>
  );
}

export default DateButton;
