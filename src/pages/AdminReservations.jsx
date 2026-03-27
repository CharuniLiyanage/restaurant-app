// src/pages/AdminReservations.jsx
import { useAdmin } from "../context/AdminContext";

export default function AdminReservations() {
  const {
    reservations,
    updateReservationStatus,
    deleteReservation,
    clearReservations,
  } = useAdmin();

  const getStatusColor = (status) => {
    if (status === "Confirmed") return "green";
    if (status === "Cancelled") return "red";
    return "orange";
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this reservation?"
    );
    if (confirmed) {
      deleteReservation(id);
    }
  };

  const handleClearAll = () => {
    if (reservations.length === 0) return;
    const confirmed = window.confirm(
      "Are you sure you want to delete all reservations?"
    );
    if (confirmed) {
      clearReservations();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Customer Reservations</h1>

      {reservations.length === 0 && <p>No reservations yet.</p>}

      {reservations.map((r) => {
        const status = r.status || "Pending";

        return (
          <div
            key={r.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
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
              <span style={{ color: getStatusColor(status), fontWeight: "bold" }}>
                {status}
              </span>
            </p>

            {/* Buttons */}
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => updateReservationStatus(r.id, "Confirmed")}
                style={{
                  marginRight: "10px",
                  padding: "6px 12px",
                  backgroundColor: "green",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Confirm
              </button>

              <button
                onClick={() => updateReservationStatus(r.id, "Cancelled")}
                style={{
                  marginRight: "10px",
                  padding: "6px 12px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Cancel
              </button>

              <button
                onClick={() => handleDelete(r.id)}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "gray",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}

      {/* Clear All Button */}
      {reservations.length > 0 && (
        <button
          onClick={handleClearAll}
          style={{
            marginTop: "20px",
            padding: "8px 16px",
            backgroundColor: "darkred",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Clear All Reservations
        </button>
      )}
    </div>
  );
}