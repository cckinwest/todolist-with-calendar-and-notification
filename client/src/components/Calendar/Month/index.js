import React from "react";
import Day from "../Day";
import { Stack } from "react-bootstrap";
import dayjs from "dayjs";

function Month({ year, month, tasks }) {
  function isLeap(y) {
    if (y % 4 === 0 && y % 100 !== 0) {
      return true;
    }

    return false;
  }

  function numOfDays(y, m) {
    const numberOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const numberOfDaysLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (isLeap(y)) {
      return numberOfDaysLeap[m - 1];
    }

    return numberOfDays[m - 1];
  }

  function ArrOfDays(y, m) {
    let arr = [];
    let num = numOfDays(y, m);
    for (var i = 0; i < num; i++) {
      let date = `${y}-${m}-${i + 1}`;
      arr.push(dayjs(date).format("YYYY-MM-DD"));
    }

    let firstOfMonth = dayjs(`${y}-${m}-1`).get("d");

    for (var i = 1; i < firstOfMonth; i++) {
      arr.unshift(dayjs(`${y}-${m}-1`).subtract(i, "d").format("YYYY-MM-DD"));
    }

    return arr;
  }

  const dates = ArrOfDays(year, month);

  return (
    <div>
      <Stack direction="horizontal" className="mt-3">
        <div style={{ width: "14%", textAlign: "center" }}>Monday</div>
        <div style={{ width: "14%", textAlign: "center" }}>Tuesday</div>
        <div style={{ width: "14%", textAlign: "center" }}>Wednesday</div>
        <div style={{ width: "14%", textAlign: "center" }}>Thursday</div>
        <div style={{ width: "14%", textAlign: "center" }}>Friday</div>
        <div style={{ width: "14%", textAlign: "center" }}>Saturday</div>
        <div style={{ width: "14%", textAlign: "center" }}>Sunday</div>
      </Stack>
      <Stack direction="horizontal" className="d-flex flex-wrap mt-2">
        {dates.map((date) => {
          return <Day date={date} tasks={tasks} />;
        })}
      </Stack>
    </div>
  );
}

export default Month;
