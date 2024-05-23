import TaskList from "./components/TaskList";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import TaskForm from "./components/TaskForm";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="mainContainer">
        <Header />
        <div className="pageContainer">
          <Routes>
            <Route exact path="/dashboard" element={<TaskForm />} />
            <Route exact path="/signup" element={<SignupForm />} />
            <Route exact path="/login" element={<LoginForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
