// src/pages/AdminDashboard.jsx
import { useAdmin } from "../context/AdminContext";
import { useState } from "react";

export default function AdminDashboard() {
  const { 
    orders, 
    confirmOrder, 
    removeOrder, 
    reviews, 
    menuItems,
    addMenuItem
  } = useAdmin();

  const [tab, setTab] = useState("orders"); // tabs: orders / reviews / menu

  // For adding new menu item
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemImg, setNewItemImg] = useState("");

  const pendingOrders = orders.filter(o => !o.confirmed);
  const confirmedOrders = orders.filter(o => o.confirmed);

  const handleAddMenuItem = () => {
    if (!newItemName || !newItemPrice || !newItemImg) {
      return alert("Please fill all fields!");
    }
    const newItem = {
      id: Date.now(),
      name: newItemName,
      price: Number(newItemPrice),
      image: newItemImg
    };
    addMenuItem(newItem);
    setNewItemName("");
    setNewItemPrice("");
    setNewItemImg("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Admin Dashboard</h1>

      {/* Tabs */}
      <div style={{ margin: "20px 0", display: "flex", gap: "10px" }}>
        <button onClick={() => setTab("orders")} style={{ padding: "10px", cursor: "pointer" }}>Orders</button>
        <button onClick={() => setTab("reviews")} style={{ padding: "10px", cursor: "pointer" }}>Reviews</button>
        <button onClick={() => setTab("menu")} style={{ padding: "10px", cursor: "pointer" }}>Menu Items</button>
      </div>

      {/* Orders Tab */}
      {tab === "orders" && (
        <div>
          <h2>Pending Orders</h2>
          {pendingOrders.length === 0 ? <p>No pending orders.</p> :
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Customer</th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Items</th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Total</th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingOrders.map(order => (
                  <tr key={order.id}>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{order.customerName}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{order.items.map(i => i.name).join(", ")}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>Rs. {order.items.reduce((sum, i) => sum + i.price * i.quantity, 0)}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      <button onClick={() => confirmOrder(order.id)} style={{ marginRight: "5px", backgroundColor: "green", color: "#fff", padding: "5px 10px", border: "none", borderRadius: "5px" }}>Confirm</button>
                      <button onClick={() => removeOrder(order.id)} style={{ backgroundColor: "red", color: "#fff", padding: "5px 10px", border: "none", borderRadius: "5px" }}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          }

          <h2 style={{ marginTop: "30px" }}>Confirmed Orders</h2>
          {confirmedOrders.length === 0 ? <p>No confirmed orders.</p> :
            <ul>
              {confirmedOrders.map(order => (
                <li key={order.id}>{order.customerName} - Rs. {order.items.reduce((sum, i) => sum + i.price * i.quantity, 0)}</li>
              ))}
            </ul>
          }
        </div>
      )}

      {/* Reviews Tab */}
      {tab === "reviews" && (
        <div>
          <h2>All Reviews</h2>
          {reviews.length === 0 ? <p>No reviews yet.</p> :
            reviews.map(r => (
              <div key={r.id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
                <p><strong>{menuItems.find(i => i.id === r.itemId)?.name || "Item"}:</strong> {r.text}</p>
                <p>Rating: {"⭐".repeat(r.rating)} - {new Date(r.date).toLocaleDateString()}</p>
              </div>
            ))
          }
        </div>
      )}

      {/* Menu Tab */}
      {tab === "menu" && (
        <div>
          <h2>Menu Items</h2>
          
          {/* Add Menu Item Form */}
          <div style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
            <h3>Add New Menu Item</h3>
            <input 
              type="text" 
              placeholder="Name" 
              value={newItemName} 
              onChange={(e) => setNewItemName(e.target.value)}
              style={{ padding: "5px", marginRight: "10px" }}
            />
            <input 
              type="number" 
              placeholder="Price" 
              value={newItemPrice} 
              onChange={(e) => setNewItemPrice(e.target.value)}
              style={{ padding: "5px", marginRight: "10px" }}
            />
            <input 
              type="text" 
              placeholder="Image URL" 
              value={newItemImg} 
              onChange={(e) => setNewItemImg(e.target.value)}
              style={{ padding: "5px", marginRight: "10px" }}
            />
            <button onClick={handleAddMenuItem} style={{ padding: "5px 10px", backgroundColor: "green", color: "#fff", border: "none", borderRadius: "5px" }}>Add Item</button>
          </div>

          {menuItems.length === 0 ? <p>No items added.</p> :
            menuItems.map(item => (
              <div key={item.id} style={{ marginBottom: "10px" }}>
                <p>{item.name} - Rs. {item.price}</p>
                {item.image && <img src={item.image} alt={item.name} style={{ width: "100px", borderRadius: "5px" }} />}
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}