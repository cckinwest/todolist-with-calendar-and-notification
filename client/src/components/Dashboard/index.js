import React from "react";
import TaskList from "../../components/Dashboard/TaskList";
import TaskForm from "../../components/TaskForm";
import Notification from "../../components/Notification";
import LoginModal from "../../components/LoginModal";

import { useEffect, useState } from "react";

import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { Container, Row, Button } from "react-bootstrap";
import dayjs from "dayjs";

function Dashboard({ taskId }) {
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(false);

  const token = localStorage.getItem("token");

  const user = token ? jwtDecode(token) : "";

  const apiEndpoint = process.env.REACT_APP_URL || "http://localhost:3002";

  useEffect(() => {
    const fetchData = async () => {
      const todos = await axios.get(
        `${apiEndpoint}/todo?username=${user.username}`
      );
      const patterns = await axios.get(
        `${apiEndpoint}/pattern?username=${user.username}`
      );

      const arrOfTasks = [...todos.data, ...patterns.data].filter((task) => {
        if (taskId) {
          return task._id === taskId;
        } else {
          return true;
        }
      });

      setTasks(arrOfTasks);
    };

    if (user) {
      fetchData();
    }
  }, []);

  return (
    <>
      <LoginModal />
      {token && (
        <>
          <Row>
            <Notification tasks={tasks} />
          </Row>
          {!taskId && (
            <Row style={{ padding: "12px" }}>
              <Button
                variant="outline-info"
                onClick={() => {
                  setShow(true);
                }}
              >
                Add
              </Button>
              {show && <TaskForm show={show} setShow={setShow} />}
            </Row>
          )}
          <Row>
            <TaskList tasks={tasks} />
          </Row>
        </>
      )}
    </>
  );
}

export default Dashboard;
