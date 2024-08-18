import React from "react";
import DailyTask from "../../components/DailyTask";
import WeekMenu from "../../components/WeekMenu";

import { Container, Row } from "react-bootstrap";

function DailyTasks() {
  return (
    <main>
      <Container>
        <Row>
          <WeekMenu />
        </Row>
        <Row>
          <DailyTask />
        </Row>
      </Container>
    </main>
  );
}

export default DailyTasks;
