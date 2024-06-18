import React from "react";
import { Card, Stack, Badge, Button } from "react-bootstrap";

function Day({ date, tasks }) {
  const onDate = (task) => {
    return task.startTime.split("T")[0] === date;
  };

  return (
    <Card style={{ width: "14%", height: "14vh" }}>
      <Card.Body key={date}>
        <Card.Title>
          {date.split("-")[2]}/{date.split("-")[1]}
        </Card.Title>
        <Stack gap={1}>
          {tasks.filter(onDate).map((task) => {
            return (
              <Badge pill bg="info">
                {task.title}
              </Badge>
            );
          })}
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default Day;
