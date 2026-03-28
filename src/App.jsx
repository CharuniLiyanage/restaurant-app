import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import { AdminProvider, useAdmin } from "./context/AdminContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Reservation from "./pages/Reservation";

import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminReservations from "./pages/AdminReservations";


// 🔐 User Protected Route
function UserRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

// 🔐 Admin Protected Route
function AdminRoute({ children }) {
  const { isAdminLoggedIn } = useAdmin();
  return isAdminLoggedIn ? children : <Navigate to="/admin-login" />;
}

function App() {
  return (
    <AuthProvider> {/* ✅ NEW */}
      <AdminProvider>
        <CartProvider>
          <Router>
            <div className="app-container">
              <Navbar />

              <main className="main-content">
                <Routes>
                  {/* PUBLIC */}
                  <Route path="/" element={<Home />} />
                  <Route path="/contact" element={<Contact />} />

                  {/* AUTH */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* USER PROTECTED */}
                  <Route path="/menu" element={
                    <UserRoute>
                      <Menu />
                    </UserRoute>
                  } />

                  <Route path="/cart" element={
                    <UserRoute>
                      <Cart />
                    </UserRoute>
                  } />

                  <Route path="/reservation" element={
                    <UserRoute>
                      <Reservation />
                    </UserRoute>
                  } />

                  {/* ADMIN */}
                  <Route path="/admin-login" element={<AdminLogin />} />

                  <Route path="/admin" element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  } />

                  <Route path="/admin-reservations" element={
                    <AdminRoute>
                      <AdminReservations />
                    </AdminRoute>
                  } />
                </Routes>
              </main>

              <Footer />
            </div>
          </Router>
        </CartProvider>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;