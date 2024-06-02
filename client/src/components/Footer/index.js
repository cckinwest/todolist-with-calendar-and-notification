import React from "react";
import { Stack } from "react-bootstrap";

function Footer() {
  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="bg-light d-flex justify-content-around align-items-center p-3"
    >
      <p className="m-0">Project by Chi Kin</p>
      <p className="m-0">
        Email: <a href="mailto:kensechan@gmail.com">kensechan@gmail.com</a>
      </p>
      <a href="https://www.linkedin.com/in/chi-kin-chan-6424ba1b9/">LinkedIn</a>
    </Stack>
  );
}

export default Footer;
