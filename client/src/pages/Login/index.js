import React from "react";
import LoginForm from "../../components/LoginForm";
import { Container, Row, Col } from "react-bootstrap";

function Login() {
  return (
    <main>
      <Container
        style={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        fluid
      >
        <Row
          className="border border-1 rounded-3 bg-light bg-gradient"
          style={{ width: "80%", padding: "20px" }}
        >
          <Col>
            <LoginForm />
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Login;
