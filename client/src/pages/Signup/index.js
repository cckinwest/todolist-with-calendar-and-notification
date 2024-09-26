import React from "react";
import SignupForm from "../../components/SignupForm";
import { Container, Row, Col } from "react-bootstrap";

function Signup() {
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
          style={{ width: "90%", padding: "20px" }}
        >
          <Col>
            <SignupForm />
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Signup;
