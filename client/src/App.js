import TaskList from "./components/TaskList";
import LoginForm from "./components/loginForm";

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
  return <LoginForm />;
}

export default App;
