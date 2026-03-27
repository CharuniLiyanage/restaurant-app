// src/pages/Reservation.jsx
import { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import "./Reservation.css";

export default function Reservation() {
  // ✅ include updateReservationStatus
  const { reservations, addReservation, updateReservationStatus } = useAdmin();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addReservation(form);
    setSubmitted(true);
    setForm({ name: "", phone: "", date: "", time: "", guests: "" });
  };

  const getStatusColor = (status) => {
    if (status === "Confirmed") return "green";
    if (status === "Cancelled") return "red";
    return "orange";
  };

  return (
    <div className="reservation-container">
      <h1>Reserve Your Table</h1>

      <form onSubmit={handleSubmit} className="reservation-form">
        {submitted && (
          <p className="success-message">
            Reservation submitted successfully!
          </p>
        )}

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your full name"
          required
        />

        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Your phone number"
          required
        />

        <div className="row">
          <div className="column">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="column">
            <label>Time</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <label>Guests</label>
        <input
          type="number"
          name="guests"
          value={form.guests}
          onChange={handleChange}
          placeholder="Number of guests"
          min="1"
          required
        />

        <button type="submit">Book Now</button>
      </form>

      <h2>Your Reservations</h2>
      {reservations.length === 0 && <p>No reservations yet.</p>}

      {reservations.map((r) => {
        const status = r.status || "Pending"; // ✅ handle old data

        return (
          <div
            key={r.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
            <p><strong>Name:</strong> {r.name}</p>
            <p><strong>Phone:</strong> {r.phone}</p>
            <p><strong>Date:</strong> {r.date}</p>
            <p><strong>Time:</strong> {r.time}</p>
            <p><strong>Guests:</strong> {r.guests}</p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color: getStatusColor(status),
                  fontWeight: "bold",
                }}
              >
                {status}
              </span>
            </p>

            {/* ✅ CUSTOMER CANCEL BUTTON */}
            {status === "Pending" && (
              <button
                onClick={() => {
                  if (window.confirm("Cancel this reservation?")) {
                    updateReservationStatus(r.id, "Cancelled");
                  }
                }}
                style={{
                  marginTop: "10px",
                  padding: "6px 12px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Cancel Reservation
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}