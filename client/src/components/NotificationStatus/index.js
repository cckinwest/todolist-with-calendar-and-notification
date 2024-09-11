import React from "react";
import { Badge, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

function NotificationStatus({ status }) {
  const color =
    status === "granted"
      ? "primary"
      : status === "denied"
      ? "danger"
      : "secondary";

  return (
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={
        <Tooltip id="notification-tooltip">
          Click on the padlock icon next to the URL in the address bar.
        </Tooltip>
      }
    >
      <Badge bg={color}>{status}</Badge>
    </OverlayTrigger>
  );
}

export default NotificationStatus;
