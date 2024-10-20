import DashboardPage from "./pages/DashboardPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CalendarPage from "./pages/CalendarPage";
import { jwtDecode } from "jwt-decode";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  const token = localStorage.getItem("token");
  let user = token ? jwtDecode(token) : null;

  return (
    <Router>
      <div className="mainContainer">
        <Header />
        <div className="pageContainer">
          <Routes>
            <Route
              exact
              path="/"
              element={<Navigate to={user ? "/calendar" : "/login"} />}
            />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/:taskId" element={<DashboardPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
