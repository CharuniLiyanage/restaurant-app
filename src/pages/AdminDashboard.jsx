// src/pages/AdminDashboard.jsx
import { useAdmin } from "../context/AdminContext";
import { useState } from "react";

export default function AdminDashboard() {
  const {
    orders,
    confirmOrder,
    removeOrder,
    menuItems,
    addMenuItem,
    updateItem,
    deleteItem
  } = useAdmin();

  const [tab, setTab] = useState("orders");

  // ---------------- STYLES ----------------
  const thStyle = {
    padding: "10px",
    textAlign: "left",
    borderBottom: "2px solid #ccc"
  };

  const tdStyle = {
    padding: "10px",
    verticalAlign: "top"
  };

  // ---------------- FORM STATES ----------------
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemImg, setNewItemImg] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Rice & Main Dishes");
  const [editingId, setEditingId] = useState(null);

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
        {/* <button onClick={() => setTab("reviews")}>Reviews</button> */}
        <button onClick={() => setTab("menu")}>Menu Items</button>
      </div>

      {/* ================= ORDERS ================= */}
      {tab === "orders" && (
        <div>
          <h2>All Orders</h2>

          {orders.length === 0 ? (
            <p>No orders available.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
              <thead>
                <tr style={{ background: "#f5f5f5" }}>
                  <th style={thStyle}>Customer</th>
                  <th style={thStyle}>Contact</th>
                  <th style={thStyle}>Address</th>
                  <th style={thStyle}>Items</th>
                  <th style={thStyle}>Total</th>
                  <th style={thStyle}>Payment</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => {
                  const total = order.items?.reduce(
                    (sum, i) => sum + i.price * i.quantity,
                    0
                  ) || 0;

                  return (
                    <tr key={order.date} style={{ borderBottom: "1px solid #ddd" }}>
                      <td style={tdStyle}>{order.details?.name || "N/A"}</td>

                      <td style={tdStyle}>
                        {order.details?.phone1 || "-"} <br />
                        {order.details?.phone2 || "-"}
                      </td>

                      <td style={tdStyle}>
                        {order.details?.address || "-"} <br />
                        <small>{order.details?.location || "-"}</small>
                      </td>

                      <td style={tdStyle}>
                        {order.items?.map((item) => (
                          <div key={item.id}>
                            {item.name} × {item.quantity}
                          </div>
                        ))}
                      </td>

                      <td style={tdStyle}>Rs. {total}</td>

                      <td style={tdStyle}>
                        {order.details?.paymentMethod || "N/A"}
                      </td>

                      <td style={tdStyle}>
                        {order.date
                          ? new Date(order.date).toLocaleString()
                          : "N/A"}
                      </td>

                      <td style={tdStyle}>
                        <span
                          style={{
                            padding: "5px 10px",
                            borderRadius: "20px",
                            color: "#fff",
                            background: order.confirmed ? "green" : "orange"
                          }}
                        >
                          {order.confirmed ? "Confirmed" : "Pending"}
                        </span>
                      </td>

                      <td style={tdStyle}>
                        {!order.confirmed && (
                          <button onClick={() => confirmOrder(order.date)}>
                            Confirm
                          </button>
                        )}
                        <button
                          style={{
                            marginLeft: "5px",
                            background: "red",
                            color: "#fff"
                          }}
                          onClick={() => removeOrder(order.date)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* ================= REVIEWS =================
      {tab === "reviews" && (
        <div>
          <h2>All Reviews</h2>
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map((r) => (
              <div key={r.id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
                <p>
                  <strong>Review:</strong> {r.review}
                </p>
                <p>{"⭐".repeat(r.rating)}</p>
                <small>{new Date(r.date).toLocaleDateString()}</small>
              </div>
            ))
          )}
        </div>
      )} */}

      {/* ================= MENU ================= */}
      {tab === "menu" && (
        <div>
          <h2>Menu Items</h2>

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

            {newItemImg && (
              <img
                src={newItemImg}
                alt="Preview"
                style={{ width: "100px", marginTop: "10px", borderRadius: "8px" }}
              />
            )}

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

          {menuItems.length === 0 ? (
            <p>No items added.</p>
          ) : (
            menuItems.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #eee",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div>
                  <p>
                    <strong>{item.name}</strong> - Rs. {item.price}
                  </p>
                  <p style={{ fontSize: "12px", color: "#666" }}>
                    {item.category}
                  </p>
                  {item.image && (
                    <img src={item.image} alt={item.name} style={{ width: "80px" }} />
                  )}
                </div>

                <div>
                  <button onClick={() => handleEditItem(item)}>Edit</button>
                  <button onClick={() => handleDeleteItem(item.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}