import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "" // ✅ Added confirm password
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Check all fields
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      return alert("Please fill all fields!");
    }

    // ✅ Check if passwords match
    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match!");
    }

    // ✅ Save user
    register({
      name: form.name,
      email: form.email,
      password: form.password
    });

    alert("Registered successfully! Please login.");
    navigate("/login"); // go to login page
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Register</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "inline-block", textAlign: "left" }}
      >
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ padding: "8px", width: "250px", marginBottom: "10px" }}
        /><br />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={{ padding: "8px", width: "250px", marginBottom: "10px" }}
        /><br />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={{ padding: "8px", width: "250px", marginBottom: "10px" }}
        /><br />

        <input
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword} // ✅ Confirm password input
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          style={{ padding: "8px", width: "250px", marginBottom: "15px" }}
        /><br />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#0d6efd",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Register
        </button>
      </form>

      <p style={{ marginTop: "20px" }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}