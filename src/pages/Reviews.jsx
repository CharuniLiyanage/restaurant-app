import { useState } from "react";
import "./Reviews.css";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === "") return;

    const newReview = { rating, comment, id: Date.now() };
    setReviews([newReview, ...reviews]);
    setRating(0);
    setComment("");
  };

  return (
    <div className="reviews-container">
      <h2>Rate & Review Our Restaurant</h2>

      <form className="reviews-form" onSubmit={handleSubmit}>
        <div className="stars">
          {[1,2,3,4,5].map((star) => (
            <span
              key={star}
              className={star <= rating ? "star selected" : "star"}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          required
        ></textarea>

        <button type="submit">Submit Review</button>
      </form>

      <div className="reviews-list">
        {reviews.length === 0 && <p>No reviews yet.</p>}
        {reviews.map((rev) => (
          <div key={rev.id} className="review-card">
            <div className="review-stars">
              {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
            </div>
            <p>{rev.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}