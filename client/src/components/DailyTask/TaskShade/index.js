import React from "react";
import dayjs from "dayjs";

function TaskShade({ task }) {
  const { title, description, startTime, endTime } = task;

  const duration = dayjs(endTime).diff(dayjs(startTime), "hour", true);
  const fraction =
    dayjs(startTime).hour() / 24 + dayjs(startTime).minute() / 1440;

  console.log(duration);
  console.log(fraction);

  return (
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
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      <h4>{title}</h4>
      <p>{description}</p>
      <p>{`${dayjs(startTime).format("hh:mm A")} - ${dayjs(endTime).format(
        "hh:mm A"
      )}`}</p>
    </div>
  );
}

export default TaskShade;
