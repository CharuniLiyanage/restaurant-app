import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AdminProvider, useAdmin } from "./context/AdminContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Reservation from "./pages/Reservation";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminReservations from "./pages/AdminReservations";

// Protected Route
function AdminRoute({ children }) {
  const { isAdminLoggedIn } = useAdmin();
  return isAdminLoggedIn ? children : <Navigate to="/admin-login" />;
}

function App() {
  return (
    <AdminProvider>
      <CartProvider>
        <Router>
          <div className="app-container">
            <Navbar />

            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/reservation" element={<Reservation />} />

                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                <Route path="/admin-reservations" element={<AdminRoute><AdminReservations /></AdminRoute>} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AdminProvider>
  );
}

export default App;