import { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext"; // <- use CartContext
import { useAdmin } from "../context/AdminContext";
import "./Menu.css";
import pizza from '../assets/pizza.jpeg';

export default function Menu() {
  // Correct: get addToCart from CartContext
  const { addToCart } = useContext(CartContext);  
  const { menuItems: adminItems } = useAdmin(); // reviews handled separately

  const [menuItems, setMenuItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const revs = JSON.parse(localStorage.getItem("reviews")) || [];
    setReviews(revs);

    const items = adminItems.map(item => ({
      ...item,
      img: item.image || pizza
    }));
    setMenuItems(items);
  }, [adminItems]);

  const categories = [
    "All",
    "Rice & Main Dishes",
    "Kottu & Noodles",
    "Western Foods",
    "Beverages",
    "Desserts",
    "Other"
  ];

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || item.category === category)
  );

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
                <img src={item.img} alt={item.name} onError={(e) => e.target.src = pizza} />
                <div className="menu-card-body">
                  <h2>{item.name}</h2>
                  <p className="price">Rs. {item.price}</p>
                  <p style={{ fontWeight: "bold", color: "#333" }}>
                    ⭐ {avgRating} / 5 ({itemReviews.length} reviews)
                  </p>
                  <button 
                    onClick={() => { 
                      addToCart(item); 
                      alert(`${item.name} added to cart! 🛒`); 
                    }}
                  >
                    Add to Cart 🛒
                  </button>

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
                      {itemReviews.map(r => (
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