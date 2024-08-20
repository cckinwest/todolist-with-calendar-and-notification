import React from "react";
import DailyTask from "../../components/DailyTask";
import { Container, Row } from "react-bootstrap";

function DailyTasks() {
  return (
    <main>
      <Container>
        <Row>
          <DailyTask />
        </Row>
      </Container>
    </main>
  );
}

export default DailyTasks;
