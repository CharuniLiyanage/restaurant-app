import { useState } from "react";
import "./Reservation.css"; // make sure to create this file
import Reviews from "./Reviews";

export default function Reservation() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reservation Data:", form);
    setSubmitted(true);
    setForm({ name: "", phone: "", date: "", time: "", guests: "" });
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

        <Reviews />
        
      </form>
    </div>
  );
}