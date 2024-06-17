import React from "react";
import Day from "../Day";
import { Card, Stack } from "react-bootstrap";

function Month({ year, month }) {
  function isLeap(y) {
    if (y % 4 == 0 && y % 100 != 0) {
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
    let Arr = [];
    let num = numOfDays(y, m);
    for (var i = 0; i < num; i++) {
      let date = `${y}-${m}-${i + 1}`;
      Arr.push(date);
    }

    return Arr;
  }

  const dates = ArrOfDays(year, month);

  return (
    <Stack direction="horizontal" className="d-flex flex-wrap">
      {dates.map((date) => {
        return <Day date={date} />;
      })}
    </Stack>
  );
}

export default Month;
