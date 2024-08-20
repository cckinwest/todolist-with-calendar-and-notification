import React from "react";
import dayjs from "dayjs";

import { OverlayTrigger, Tooltip } from "react-bootstrap";

function TaskShade({ task }) {
  const { title, description, startTime, endTime } = task;

  const duration = dayjs(endTime).diff(dayjs(startTime), "hour", true);
  const fraction =
    dayjs(startTime).hour() / 24 + dayjs(startTime).minute() / 1440;

  const renderTip = (props) => {
    return (
      <Tooltip id={`tooltip-${task._id}`} {...props}>
        <h4>{title}</h4>
        <p>{description}</p>
        <p>{`${dayjs(startTime).format("hh:mm A")} - ${dayjs(endTime).format(
          "hh:mm A"
        )}`}</p>
      </Tooltip>
    );
  };

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTip}
    >
      <div
        style={{
          height: `calc(100% * ${duration}/24)`,
          width: "80%",
          left: "10%",
          position: "absolute",
          top: `calc(100% * ${fraction})`,
          backgroundColor: "gold",
          opacity: "80%",
          zIndex: "20",
          padding: `${duration < 3 ? "0" : "5px"}`,
          borderRadius: `${duration < 3 ? "0" : "5px"}`,
          display: `${duration < 2 ? "flex" : "block"}`,
          justifyContent: `${duration < 2 ? "space-between" : "flex-start"}`,
          fontSize: `${duration > 3 ? "16px" : "12px"}`,
          margin: "0",
        }}
      >
        <p>{title}</p>
        <p>{description}</p>
        <p>{`${dayjs(startTime).format("hh:mm A")} - ${dayjs(endTime).format(
          "hh:mm A"
        )}`}</p>
      </div>
    </OverlayTrigger>
  );
}

export default TaskShade;
