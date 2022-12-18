import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { CartProvider } from "./context/CartContext";
import Settings from "./pages/admin_settings/Settings";
import ForgotPassword from "./pages/admin_settings/ForgotPassword";
import ResetPassword from "./pages/admin_settings/ResetPassword";

function App() {
  return (
    <CartProvider>
      <Router>
        <header>
          <nav>
            <Navbar />
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/forgot_pass" element={<ForgotPassword />} />
            <Route path="/resetpassword/:resetToken" element={<ResetPassword/>}/>
          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
}

export default App;
