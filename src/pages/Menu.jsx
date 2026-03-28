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
  const { menuItems, reviews } = useAdmin();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

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

  // Function to show message when adding to cart
  const handleAddToCart = (item) => {
    addToCart(item);
    alert(`${item.name} added to cart! 🛒`);
  };

  return (
    <div className="menu-container">
      <h1 className="menu-title">Our Menu</h1>

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

                  <p style={{ fontWeight: "bold", color: "#333" }}>
                    ⭐ {avgRating} / 5 ({itemReviews.length} reviews)
                  </p>

                  {/* Add to cart with alert message */}
                  <button onClick={() => handleAddToCart(item)}>Add to Cart 🛒</button>

                  {/* Reviews List kept exactly as original */}
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
    </div>
  );
}