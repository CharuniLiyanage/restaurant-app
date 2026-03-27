import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useAdmin } from "../context/AdminContext";
import "./Menu.css";

// images
import pizza from '../assets/pizza.jpeg';
import burger from '../assets/burger.jpeg';
import pasta from '../assets/pasta.jpeg';
import Fried_Rice from '../assets/Fried_Rice.jpg';
import Chicken_Kottu from '../assets/Chicken_Kottu.jpeg';
import Noodles from '../assets/Noodles.jpeg';

// default menu items
const defaultItems = [
  { id: 1, name: "Pizza", price: 1200, category: "Fast Food", img: pizza },
  { id: 2, name: "Burger", price: 800, category: "Fast Food", img: burger },
  { id: 3, name: "Pasta", price: 1500, category: "Fast Food", img: pasta },
  { id: 4, name: "Fried Rice", price: 1000, category: "Rice", img: Fried_Rice },
  { id: 5, name: "Chicken Kottu", price: 900, category: "Kottu", img: Chicken_Kottu },
  { id: 6, name: "Noodles", price: 700, category: "Noodles", img: Noodles }
];

export default function Menu() {
  const { addToCart } = useContext(CartContext);
  const { menuItems, addReview, reviews } = useAdmin();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [reviewModal, setReviewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  // format admin menu items
  const adminFormatted = menuItems.map(item => ({
    id: item.id,
    name: item.name,
    price: item.price,
    category: item.category || "Other",
    img: item.image || pizza
  }));

  const allItems = [...defaultItems, ...adminFormatted];

  const categories = ["All", ...new Set(allItems.map(item => item.category))];

  const filteredItems = allItems.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || item.category === category)
  );

  const handleOpenReview = (item) => {
    setSelectedItem(item);
    setReviewText("");
    setReviewRating(5);
    setReviewModal(true);
  };

  const handleSubmitReview = () => {
    if (!reviewText) return alert("Please write a review!");
    addReview({
      itemId: selectedItem.id,
      text: reviewText,
      rating: reviewRating,
      date: new Date().toISOString()
    });
    setReviewModal(false);
  };

  const getAverageRating = (itemId) => {
    const itemReviews = reviews.filter(r => r.itemId === itemId);
    if (!itemReviews.length) return 0;
    const avg = itemReviews.reduce((acc, r) => acc + r.rating, 0) / itemReviews.length;
    return avg.toFixed(1);
  };

  return (
    <div className="menu-container">
      <h1 className="menu-title">Our Menu</h1>

      {/* SEARCH + FILTER */}
      <div className="menu-controls">
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <div className="category-buttons">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={category === cat ? "active" : ""}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* MENU ITEMS */}
      <div className="menu-grid">
        {filteredItems.length === 0 ? (
          <p style={{ textAlign: "center" }}>No items found 😢</p>
        ) : (
          filteredItems.map(item => {
            const itemReviews = reviews.filter(r => r.itemId === item.id);
            const avgRating = itemReviews.length
              ? (itemReviews.reduce((acc, r) => acc + r.rating, 0) / itemReviews.length).toFixed(1)
              : 0;

            return (
              <div key={item.id} className="menu-card">
                <img
                  src={item.img}
                  alt={item.name}
                  onError={(e) => e.target.src = pizza}
                />
                <div className="menu-card-body">
                  <h2>{item.name}</h2>
                  <p className="price">Rs. {item.price}</p>

                  {/* Average Rating */}
                  <p style={{ fontWeight: "bold", color: "#333" }}>
                    ⭐ {avgRating} / 5 ({itemReviews.length} reviews)
                  </p>

                  <button onClick={() => addToCart(item)}>Add to Cart 🛒</button>
                  <button
                    onClick={() => handleOpenReview(item)}
                    style={{
                      marginTop: "5px",
                      backgroundColor: "#333",
                      color: "white",
                      borderRadius: "5px",
                      padding: "6px 12px",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    Review
                  </button>

                  {/* Reviews List */}
                  {itemReviews.length > 0 && (
                    <div style={{
                      marginTop: "10px",
                      textAlign: "left",
                      maxHeight: "120px",
                      overflowY: "auto",
                      padding: "5px",
                      background: "#f9f9f9",
                      borderRadius: "5px"
                    }}>
                      {itemReviews.map((r) => (
                        <div key={r.date} style={{ marginBottom: "6px", borderBottom: "1px solid #eee", paddingBottom: "5px" }}>
                          <p style={{ margin: "0", fontSize: "14px", color: "#555" }}>
                            <span style={{ color: "#ffc107" }}>{"⭐".repeat(r.rating)}</span> - {r.text}
                          </p>
                          <p style={{ fontSize: "12px", color: "#999" }}>{new Date(r.date).toLocaleDateString()}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Review Modal */}
      {reviewModal && selectedItem && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "white",
            padding: "30px",
            borderRadius: "10px",
            width: "400px",
            textAlign: "center"
          }}>
            <h2>Review: {selectedItem.name}</h2>
            <textarea
              rows="4"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review..."
              style={{ width: "100%", padding: "10px", margin: "10px 0" }}
            />

            <div style={{ marginBottom: "10px" }}>
              <label>Rating: </label>
              <select
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
                style={{ padding: "5px" }}
              >
                {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>

            <button
              onClick={handleSubmitReview}
              style={{ padding: "8px 15px", marginRight: "10px", backgroundColor: "green", color: "white", border: "none", borderRadius: "5px" }}
            >
              Submit
            </button>
            <button
              onClick={() => setReviewModal(false)}
              style={{ padding: "8px 15px", backgroundColor: "red", color: "white", border: "none", borderRadius: "5px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}