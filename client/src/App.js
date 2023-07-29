import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { CartProvider } from "./context/CartContext";
import Settings from "./pages/admin_settings/Settings";
import ForgotPassword from "./pages/admin_settings/ForgotPassword";
import ResetPassword from "./pages/admin_settings/ResetPassword";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import EnterTime from "./pages/EnterTime";
import TimeTable from "./pages/TimeTable";

function App() {
  return (
    <CartProvider>
      <Router>
        <header>
          <nav>
            <Navbar />
          </nav>
        </header>
        <main className="dark:bg-gray-400 bg-gray-100 min-h-[calc(100vh-66px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/forgot_pass" element={<ForgotPassword />} />
            <Route path="/enter_time" element={<EnterTime />} />
            <Route
              path="/resetpassword/:resetToken"
              element={<ResetPassword />}
            />
            <Route path="my_time" element={<TimeTable />} />
          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
}

export default App;
