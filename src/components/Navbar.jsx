import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAdmin } from "../context/AdminContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { isAdminLoggedIn, adminLogout } = useAdmin();

  const linkStyle = {
    margin: "0 10px",
    color: "white",
    textDecoration: "none",
    fontWeight: "500"
  };

  const logoutBtn = {
    marginLeft: "10px",
    padding: "6px 12px",
    background: "#e63946",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  };

  return (
    <nav style={{
      padding: "15px 30px",
      background: "#111",
      color: "#fff",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <h2>Delicious Foods</h2>

      {/* LINKS */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/" style={linkStyle}>Home</Link>

        {!isAdminLoggedIn && user && (
          <>
            <Link to="/menu" style={linkStyle}>Menu</Link>
            <Link to="/cart" style={linkStyle}>Cart 🛒</Link>
            <Link to="/reservation" style={linkStyle}>Reservation 📅</Link>
            <Link to="/my-orders" style={linkStyle}>My Orders</Link>
          </>
        )}

        {isAdminLoggedIn && (
          <>
            <Link to="/admin" style={linkStyle}>Dashboard</Link>
            <Link to="/admin-reservations" style={linkStyle}>Reservations</Link>
          </>
        )}
      </div>

      {/* USER / ADMIN INFO */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {isAdminLoggedIn && (
          <>
            <span style={{ marginRight: "10px", fontWeight: "500", color: "#ddd" }}>Admin</span>
            <button onClick={adminLogout} style={logoutBtn}>Logout</button>
          </>
        )}

        {!isAdminLoggedIn && user && (
          <>
            <span style={{ marginRight: "10px", fontWeight: "500", color: "#ddd" }}>👤 {user.name}</span>
            <button onClick={logout} style={logoutBtn}>Logout</button>
          </>
        )}

        {!isAdminLoggedIn && !user && (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}