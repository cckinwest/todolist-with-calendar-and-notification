import React from "react";
import Calendar from "../../components/Calendar";
import { Container } from "react-bootstrap";

function CalendarPage() {
  return (
    <main>
      <Container style={{ height: "80vh" }}>
        <Calendar />
      </Container>
    </main>
  );
}

export default CalendarPage;
