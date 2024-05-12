import TaskList from "./components/TaskList";

const task_list = [
  {
    name: "review MongoDB",
    description: "how to setup MongoDB, how to setup an API",
    priority: "high",
  },

  {
    name: "review JWT",
    description: "the theory of JWT, how to setup token",
    priority: "high",
  },

  {
    name: "review React",
    description: "install React, setup component",
    priority: "low",
  },
];

function App() {
  return <TaskList tasks={task_list} />;
}

export default App;
