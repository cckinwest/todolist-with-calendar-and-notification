import React from "react";
import axios from "axios";
import { useState } from "react";
import { Form, Button, Card, Stack } from "react-bootstrap";
import dayjs from "dayjs";
import EditForm from "../../../EditForm";

const Task = ({ task, date }) => {
  const isPattern = task.frequency ? true : false;

  const [edit, setEdit] = useState(false);
  const [enableNotification, setEnableNotification] = useState(
    task.notification
  );
  const apiEndpoint = process.env.REACT_APP_URL || "http://localhost:3002";

  const handleDelete = () => {
    axios
      .put(
        isPattern
          ? `${apiEndpoint}/pattern/deleteAnIndividual`
          : `${apiEndpoint}/todo/delete`,
        isPattern ? { patternId: task._id, date: date } : { taskId: task._id }
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNotification = () => {
    axios
      .put(
        isPattern
          ? `${apiEndpoint}/pattern/changeAnIndividual`
          : `${apiEndpoint}/todo/update`,
        {
          id: task._id,
          patternId: task._id,
          title: task.title,
          description: task.description,
          startTime: `${date}T${dayjs(task.startTime).format("HH:mm")}`,
          endTime: `${date}T${dayjs(task.endTime).format("HH:mm")}`,
          frequency: task.frequency,
          date: date,
          notification: !enableNotification,
          notificationTime: task.notificationTime,
          alarmTime: task.alarmTime,
          createdBy: task.createdBy,
        }
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });

    setEnableNotification(!enableNotification);
  };

  return (
    <>
      {edit && <EditForm task={task} isEdit={edit} setIsEdit={setEdit} />}
      <Card bg={isPattern ? "danger" : "primary"} text="white">
        <Card.Header
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h5 style={{ marginBottom: 0 }}>
            {`${task.title} (${dayjs(task.startTime).format(
              "HH:mm"
            )} to ${dayjs(task.endTime).format("HH:mm")})`}
          </h5>

          <Stack direction="horizontal" gap={2}>
            <Button
              variant="outline-light"
              onClick={() => {
                setEdit(true);
              }}
              style={{
                textAlign: "center",
                height: "30px",
                width: "30px",
                borderRadius: "50%",
                padding: "0",
              }}
            >
              <i className="bi bi-pencil"></i>
            </Button>
            <Button
              variant="outline-light"
              onClick={handleDelete}
              style={{
                textAlign: "center",
                height: "30px",
                width: "30px",
                borderRadius: "50%",
                padding: "0",
              }}
            >
              <i className="bi bi-trash3"></i>
            </Button>
            <Button
              variant="outline-light"
              onClick={handleNotification}
              style={{
                textAlign: "center",
                height: "30px",
                width: "30px",
                borderRadius: "50%",
                padding: "0",
              }}
            >
              <i
                className={
                  enableNotification ? "bi bi-bell-fill" : "bi bi-bell-slash"
                }
              ></i>
            </Button>
          </Stack>
        </Card.Header>
        <Card.Body>
          <Card.Text style={{ marginBottom: 0 }}>{task.description}</Card.Text>
          {isPattern && (
            <Card.Text>{`${dayjs(task.startDate).format(
              "YYYY-MM-DD"
            )} to ${dayjs(task.endDate).format("YYYY-MM-DD")}`}</Card.Text>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default Task;
