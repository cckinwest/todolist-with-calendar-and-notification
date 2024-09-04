import React from "react";
import Task from "./Task";
import Pattern from "./Pattern";

import { Stack, Card } from "react-bootstrap";

const TaskList = ({ tasks, showAll, dateSelected }) => {
  function onDate(taskInput) {
    return taskInput.startTime.split("T")[0] === dateSelected;
  }

  function onDateSelected(task, date) {
    return task.startTime.split("T")[0] === date;
  }

  const tasksLength = tasks.filter(onDate).length;

  const arrOfDates = [];

  tasks.forEach((task) => {
    let date = task.startTime.split("T")[0];
    if (!arrOfDates.includes(date)) {
      arrOfDates.push(date);
    }
  });

  arrOfDates.sort((date1, date2) => {
    return new Date(date2).getTime() - new Date(date1).getTime();
  });

  console.log(arrOfDates);

  return showAll ? (
    <Stack gap={2}>
      {arrOfDates.map((date) => {
        return (
          <>
            <h4 style={{ marginTop: "10px", marginBottom: 0 }}>{date}</h4>

            {tasks
              .filter((task) => onDateSelected(task, date))
              .map((task) =>
                task.startDate ? (
                  <Pattern task={task} key={task._id} />
                ) : (
                  <Task task={task} key={task._id} />
                )
              )}
          </>
        );
      })}
    </Stack>
  ) : tasksLength > 0 ? (
    <Stack gap={2}>
      {tasks.filter(onDate).map((task) => {
        return <Task task={task} key={task._id} />;
      })}
    </Stack>
  ) : (
    <div className="d-flex justify-content-cneter">
      <Card
        className="border border-1 rounded-3 bg-light bg-gradient p-2"
        style={{ width: "99vw" }}
      >
        <Card.Body>
          <Card.Text>No Tasks on {dateSelected}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TaskList;
