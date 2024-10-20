import React from "react";
import Dashboard from "../../components/Dashboard";

import { Container, Row, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

function DashboardPage() {
  const { taskId } = useParams();

  return (
    <main>
      <Container fluid>
        <Dashboard taskId={taskId} />
      </Container>
    </main>
  );
}

export default DashboardPage;
