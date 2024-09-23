import React from "react";
import axios from "axios";
import { useState } from "react";
import { Form, Button, Card, Stack } from "react-bootstrap";
import dayjs from "dayjs";
import EditForm from "../../EditForm";

const Task = ({ task }) => {
  const isPattern = task.startDate ? true : false;

  const [edit, setEdit] = useState(false);
  const apiEndpoint = process.env.REACT_APP_URL;

  const handleDelete = () => {
    axios
      .put(
        isPattern
          ? `${apiEndpoint}/pattern/delete`
          : `${apiEndpoint}/todo/delete`,
        isPattern ? { patternId: task._id } : { taskId: task._id }
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
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
