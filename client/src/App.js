import Dashboard from "./pages/Dashboard";
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
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/calendar" element={<CalendarPage />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/login" element={<Login />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
