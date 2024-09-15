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
import TimeTable from "./pages/TimeTable";
import EditTime from "./pages/EditTime";
import Plot from "./pages/Plot";
import Map from "./pages/Map";

function App() {
  return (
    <CartProvider>
      <Router>
        <header>
          <nav>
            <Navbar />
          </nav>
        </header>
        <main className="dark:bg-gray-400 bg-gray-100 min-h-[calc(100vh-66px)] p-2">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/forgot_pass" element={<ForgotPassword />} />
            <Route path="/plot" element={<Plot />} />
            <Route path="/map/:map_id" element={<Map />} />
            <Route
              path="/resetpassword/:resetToken"
              element={<ResetPassword />}
            />
            <Route path="/my_time" element={<TimeTable />} />
            <Route path="/edit_time/:id" element={<EditTime />} />
          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
}

export default App;
