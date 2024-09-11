import React from "react";
import Task from "./Task";

import { Stack, Card } from "react-bootstrap";

const TaskList = ({ tasks }) => {
  function onDateSelected(task, date) {
    const isPattern = task.startDate ? true : false;

    return isPattern
      ? task.startDate === date
      : task.startTime.split("T")[0] === date;
  }

  const arrOfDates = [];

  tasks.forEach((task) => {
    const isPattern = task.startDate ? true : false;
    let date = isPattern ? task.startDate : task.startTime.split("T")[0];
    if (!arrOfDates.includes(date)) {
      arrOfDates.push(date);
    }
  });

  arrOfDates.sort((date1, date2) => {
    return new Date(date2).getTime() - new Date(date1).getTime();
  });

  console.log(arrOfDates);

  return (
    <Stack gap={2}>
      {arrOfDates.map((date) => {
        return (
          <>
            <h4 style={{ marginTop: "10px", marginBottom: 0 }}>{date}</h4>

            {tasks
              .filter((task) => onDateSelected(task, date))
              .map((task) => (
                <Task task={task} key={task._id} />
              ))}
          </>
        );
      })}
    </Stack>
  );
};

export default TaskList;
