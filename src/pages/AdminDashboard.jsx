import { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const {
    menuItems,
    addMenuItem,
    deleteItem,
    updateItem,
    orders,
    messages,
  } = useAdmin();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    if (!name || !price || !image) {
      alert("Please fill all fields and select an image");
      return;
    }
    addMenuItem({
      id: Date.now(),
      name,
      price: Number(price),
      image,
      category: "Fast Food",
    });
    setName("");
    setPrice("");
    setImage(null);
  };

  return (
    <div style={{ padding: 20 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Admin Dashboard</h1>
        <button
          onClick={() => navigate("/admin-reservations")}
          style={{
            padding: "10px 15px",
            background: "black",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Reservations
        </button>
      </div>

      {/* Add Menu Item */}
      <h2>Add New Item</h2>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <input type="file" onChange={handleImage} style={{ marginRight: 10 }} />
      <button onClick={handleAdd}>Add</button>

      {/* Menu Items */}
      <h2>Menu Items</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {menuItems.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              width: 200,
              textAlign: "center",
            }}
          >
            <img src={item.image} width="150" alt={item.name} />
            <p>{item.name}</p>
            <p>Rs. {item.price}</p>
            <button onClick={() => deleteItem(item.id)} style={{ marginRight: 5 }}>
              Delete
            </button>
            <button
              onClick={() => {
                const n = prompt("New name", item.name);
                const p = prompt("New price", item.price);
                updateItem({ ...item, name: n, price: Number(p) });
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* Orders */}
      <h2 style={{ marginTop: 40 }}>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((o) => (
          <div
            key={o.id}
            style={{
              border: "1px solid #ccc",
              marginBottom: 10,
              padding: 10,
            }}
          >
            <p><strong>Total:</strong> Rs. {o.total}</p>
            <p><strong>Items:</strong></p>
            <ul>
              {o.items.map((i) => (
                <li key={i.id}>{i.name}</li>
              ))}
            </ul>
          </div>
        ))
      )}

      {/* Messages */}
      <h2 style={{ marginTop: 40 }}>Customer Messages</h2>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        messages.map((m) => (
          <div
            key={m.id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 10,
            }}
          >
            <p><strong>{m.name || "Anonymous"}:</strong> {m.text}</p>
          </div>
        ))
      )}
    </div>
  );
}