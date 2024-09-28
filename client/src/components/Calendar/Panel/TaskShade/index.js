import React from "react";
import dayjs from "dayjs";

import { OverlayTrigger, Tooltip } from "react-bootstrap";

import "bootstrap-icons/font/bootstrap-icons.css";

function TaskShade({ task }) {
  const { title, description, startTime, endTime } = task;

  const isPattern = task.frequency ? true : false;

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
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTip}
    >
      <div
        className={
          isPattern ? "bg-danger bg-gradient" : "bg-primary bg-gradient"
        }
        style={{
          height: `calc(100% * ${duration}/24)`,
          width: "80%",
          left: "10%",
          position: "absolute",
          top: `calc(100% * ${fraction})`,
          opacity: "75%",
          color: "white",
          zIndex: "20",
          padding: `${duration > 3 ? "10px" : duration > 2 ? "5px" : "2px"}`,
          borderRadius: `${
            duration > 3 ? "10px" : duration > 2 ? "5px" : "2px"
          }`,
          display: "flex",
          flexDirection: `${duration < 0.5 ? "row" : "column"}`,
          justifyContent: `${duration < 0.5 ? "space-between" : "center"}`,
          alignItems: "center",
          fontSize: `${
            duration > 1.5 ? "15px" : duration > 0.25 ? "10px" : "8px"
          }`,
        }}
      >
        <p style={{ margin: "0" }}>
          <strong>{title}</strong>
        </p>
        <p style={{ margin: "0", textAlign: "center" }}>{description}</p>
      </div>
    </OverlayTrigger>
  );
}

export default TaskShade;
