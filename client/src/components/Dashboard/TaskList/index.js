import React from "react";
import Task from "./Task";

import { Stack, Card } from "react-bootstrap";
import { Fragment } from "react";

const TaskList = ({ tasks, dateSelected }) => {
  function onDateSelected(task, date) {
    return task.dates.includes(date);
  }

  const arrOfDates = [];

  if (dateSelected) {
    arrOfDates.push(dateSelected);
  } else {
    tasks.forEach((task) => {
      task.dates.forEach((date) => {
        task.dates.includes(date) &&
          !arrOfDates.includes(date) &&
          arrOfDates.push(date);
      });
    });

    arrOfDates.sort((date1, date2) => {
      return new Date(date2).getTime() - new Date(date1).getTime();
    });
  }

  return (
    <Stack gap={2}>
      {arrOfDates.map((date) => {
        return (
          <Fragment key={date}>
            <h4 style={{ marginTop: "10px", marginBottom: 0 }}>{date}</h4>

            {tasks
              .filter((task) => onDateSelected(task, date))
              .map((task) => (
                <Task task={task} key={task._id} date={date} />
              ))}
          </Fragment>
        );
      })}
    </Stack>
  );
};

export default TaskList;
