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
    addMenuItem,
    updateItem, // fixed function name
    deleteItem // fixed function name
  } = useAdmin();

  const [tab, setTab] = useState("orders");

  // ---------------- FORM STATES ----------------
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemImg, setNewItemImg] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Rice & Main Dishes");
  const [editingId, setEditingId] = useState(null);

  const pendingOrders = orders.filter(o => !o.confirmed);
  const confirmedOrders = orders.filter(o => o.confirmed);

  // ---------------- ADD ITEM ----------------
  const handleAddMenuItem = () => {
    if (!newItemName || !newItemPrice || !newItemImg) {
      return alert("Please fill all fields!");
    }

    const newItem = {
      id: Date.now(),
      name: newItemName,
      price: Number(newItemPrice),
      image: newItemImg,
      category: newItemCategory
    };

    addMenuItem(newItem);
    clearForm();
  };

  // ---------------- UPDATE ITEM ----------------
  const handleUpdateItem = () => {
    const updatedItem = {
      id: editingId,
      name: newItemName,
      price: Number(newItemPrice),
      image: newItemImg,
      category: newItemCategory
    };

    updateItem(updatedItem);
    clearForm();
  };

  // ---------------- DELETE ITEM ----------------
  const handleDeleteItem = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      deleteItem(id);
    }
  };

  // ---------------- EDIT ITEM ----------------
  const handleEditItem = (item) => {
    setEditingId(item.id);
    setNewItemName(item.name);
    setNewItemPrice(item.price);
    setNewItemImg(item.image);
    setNewItemCategory(item.category || "Other");
  };

  // ---------------- CLEAR FORM ----------------
  const clearForm = () => {
    setNewItemName("");
    setNewItemPrice("");
    setNewItemImg("");
    setNewItemCategory("Rice & Main Dishes");
    setEditingId(null);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Admin Dashboard</h1>

      {/* ---------------- TABS ---------------- */}
      <div style={{ margin: "20px 0", display: "flex", gap: "10px" }}>
        <button onClick={() => setTab("orders")}>Orders</button>
        <button onClick={() => setTab("reviews")}>Reviews</button>
        <button onClick={() => setTab("menu")}>Menu Items</button>
      </div>

      {/* ================= ORDERS ================= */}
      {tab === "orders" && (
        <div>
          <h2>Pending Orders</h2>
          {pendingOrders.length === 0 ? <p>No pending orders.</p> :
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingOrders.map(order => (
                  <tr key={order.id}>
                    <td>{order.customerName}</td>
                    <td>{order.items.map(i => i.name).join(", ")}</td>
                    <td>Rs. {order.items.reduce((sum, i) => sum + i.price * i.quantity, 0)}</td>
                    <td>
                      <button onClick={() => confirmOrder(order.id)}>Confirm</button>
                      <button onClick={() => removeOrder(order.id)}>Remove</button>
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
                <li key={order.id}>
                  {order.customerName} - Rs. {order.items.reduce((sum, i) => sum + i.price * i.quantity, 0)}
                </li>
              ))}
            </ul>
          }
        </div>
      )}

      {/* ================= REVIEWS ================= */}
      {tab === "reviews" && (
        <div>
          <h2>All Reviews</h2>
          {reviews.length === 0 ? <p>No reviews yet.</p> :
            reviews.map(r => (
              <div key={r.id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
                <p>
                  <strong>{menuItems.find(i => i.id === r.itemId)?.name || "Item"}:</strong> {r.text}
                </p>
                <p>{"⭐".repeat(r.rating)} - {new Date(r.date).toLocaleDateString()}</p>
              </div>
            ))
          }
        </div>
      )}

      {/* ================= MENU ================= */}
      {tab === "menu" && (
        <div>
          <h2>Menu Items</h2>

          {/* ----------- FORM ----------- */}
          <div style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h3>{editingId ? "Edit Item" : "Add New Item"}</h3>

            <input
              type="text"
              placeholder="Name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />

            <input
              type="number"
              placeholder="Price"
              value={newItemPrice}
              onChange={(e) => setNewItemPrice(e.target.value)}
            />

            {/* File upload */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onloadend = () => setNewItemImg(reader.result);
                reader.readAsDataURL(file);
              }}
            />

            {/* Image preview */}
            {newItemImg && (
              <img src={newItemImg} alt="Preview" style={{ width: "100px", marginTop: "10px", borderRadius: "8px" }} />
            )}

            {/* CATEGORY */}
            <select
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value)}
            >
              <option>Rice & Main Dishes</option>
              <option>Kottu & Noodles</option>
              <option>Western Foods</option>
              <option>Beverages</option>
              <option>Desserts</option>
            </select>

            {editingId ? (
              <button onClick={handleUpdateItem}>Update</button>
            ) : (
              <button onClick={handleAddMenuItem}>Add</button>
            )}
          </div>

          {/* ----------- MENU LIST ----------- */}
          {menuItems.length === 0 ? <p>No items added.</p> :
            menuItems.map(item => (
              <div key={item.id} style={{
                border: "1px solid #eee",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div>
                  <p><strong>{item.name}</strong> - Rs. {item.price}</p>
                  <p style={{ fontSize: "12px", color: "#666" }}>{item.category}</p>
                  {item.image && (
                    <img src={item.image} alt={item.name} style={{ width: "80px" }} />
                  )}
                </div>

                <div>
                  <button onClick={() => handleEditItem(item)}>Edit</button>
                  <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                </div>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}