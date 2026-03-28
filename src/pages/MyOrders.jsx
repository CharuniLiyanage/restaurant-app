import { useEffect, useState } from "react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [ratingModal, setRatingModal] = useState(false);
  const [currentOrderDate, setCurrentOrderDate] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders.reverse()); // latest first
  }, []);

  // Confirm order received and open rating
  const handleConfirmReceived = (date) => {
    setCurrentOrderDate(date);
    setRatingModal(true);
  };

  // Submit rating + review and remove order
  const handleSubmitRating = () => {
    if (rating === 0) return alert("Please select a rating!");

    // Save rating + review in localStorage (optional)
    const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    savedReviews.push({
      orderDate: currentOrderDate,
      rating,
      review,
      date: new Date().toISOString(),
    });
    localStorage.setItem("reviews", JSON.stringify(savedReviews));

    // Remove order from orders
    const updatedOrders = orders.filter(order => order.date !== currentOrderDate);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify([...updatedOrders].reverse()));

    // Reset modal
    setRatingModal(false);
    setRating(0);
    setReview("");
    setCurrentOrderDate(null);

    alert("Thank you for your rating and review!");
  };

  return (
    <div style={{ padding: "40px", minHeight: "80vh", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>My Orders 📝</h1>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px" }}>You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.date} style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", marginBottom: "20px" }}>
            <div style={{ borderBottom: "1px solid #eee", paddingBottom: "10px", marginBottom: "10px" }}>
              <h3>Order ID: {order.date}</h3>
              <p><strong>Name:</strong> {order.details.name}</p>
              <p><strong>Phone:</strong> {order.details.phone1} / {order.details.phone2}</p>
              <p><strong>Address:</strong> {order.details.address}</p>
              <p><strong>Location:</strong> {order.details.location}</p>
              <p><strong>Payment:</strong> {order.details.paymentMethod}</p>
              <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
            </div>

            <h4>Items:</h4>
            {order.items.map((item) => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                <span>{item.name} x {item.quantity}</span>
                <span>Rs. {item.price * item.quantity}</span>
              </div>
            ))}

            <div style={{ textAlign: "right", marginTop: "10px" }}>
              <button
                onClick={() => handleConfirmReceived(order.date)}
                style={{ padding: "10px 15px", background: "green", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
              >
                Confirm Received ✅
              </button>
            </div>
          </div>
        ))
      )}

      {/* Rating + Review Modal */}
      {ratingModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ background: "white", padding: "30px", borderRadius: "10px", width: "400px", textAlign: "center" }}>
            <h2>Rate Your Order ⭐</h2>
            
            {/* Stars */}
            <div style={{ display: "flex", justifyContent: "center", margin: "20px 0", gap: "10px" }}>
              {[1,2,3,4,5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  style={{ fontSize: "30px", cursor: "pointer", color: rating >= star ? "gold" : "#ccc" }}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Review Textarea */}
            <textarea
              placeholder="Write your review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc" }}
            />

            {/* Buttons */}
            <div>
              <button
                onClick={handleSubmitRating}
                style={{ padding: "10px 15px", background: "green", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
              >
                Submit ✅
              </button>
              <button
                onClick={() => { setRatingModal(false); setRating(0); setReview(""); }}
                style={{ padding: "10px 15px", background: "gray", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginLeft: "10px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}