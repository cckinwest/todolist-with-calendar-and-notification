import React from "react";
import { Button } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

function DateButton({ date, setDay, active, occupied }) {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1200px)" });

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
        height: isSmallScreen ? "30px" : "40px",
        width: isSmallScreen ? "30px" : "40px",
        padding: "0",
        borderRadius: "50%",
        fontSize: isSmallScreen ? "10px" : "12px",
      }}
    >
      {date.format("DD/MM")}
    </Button>
  );
}

export default DateButton;
