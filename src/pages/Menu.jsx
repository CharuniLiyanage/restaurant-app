import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Menu.css";

// images
import pizza from '../assets/pizza.jpeg';
import burger from '../assets/burger.jpeg';
import pasta from '../assets/pasta.jpeg';
import Fried_Rice from '../assets/Fried_Rice.jpg';
import Chicken_Kottu from '../assets/Chicken_Kottu.jpeg';
import Noodles from '../assets/Noodles.jpeg';

// menu items
const items = [
  { id: 1, name: "Pizza", price: 1200, category: "Fast Food", img: pizza },
  { id: 2, name: "Burger", price: 800, category: "Fast Food", img: burger },
  { id: 3, name: "Pasta", price: 1500, category: "Fast Food", img: pasta },
  { id: 4, name: "Fried Rice", price: 1000, category: "Rice", img: Fried_Rice },
  { id: 5, name: "Chicken Kottu", price: 900, category: "Kottu", img: Chicken_Kottu },
  { id: 6, name: "Noodles", price: 700, category: "Noodles", img: Noodles }
];

export default function Menu() {
  const { addToCart } = useContext(CartContext);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || item.category === category)
  );

  return (
    <div className="menu-container">

      <h1 className="menu-title">Our Menu</h1>

      {/* SEARCH */}
      <div className="menu-controls">
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <div className="category-buttons">
          {["All", "Fast Food", "Rice", "Kottu", "Noodles"].map(cat => (
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

      {/* ITEMS */}
      <div className="menu-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="menu-card">

            <img src={item.img} alt={item.name} />

            <div className="menu-card-body">
              <h2>{item.name}</h2>
              <p className="price">Rs. {item.price}</p>

              <button onClick={() => addToCart(item)}>
                Add to Cart 🛒
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}