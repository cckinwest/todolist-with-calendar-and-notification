import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CalendarPage from "./pages/CalendarPage";
import DailyTasks from "./pages/DailyTasks";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="mainContainer">
        <Header />
        <div className="pageContainer">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/calendar" element={<CalendarPage />} />
            <Route exact path="/dailytasks" element={<DailyTasks />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
