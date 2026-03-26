import { useState } from "react";
import { useAdmin } from "../context/AdminContext";

export default function AdminDashboard() {
  const { menuItems, addMenuItem, reviews, messages } = useAdmin();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  // Convert uploaded image to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = () => {
    if (!name || !price || !image) {
      alert("Please fill all fields and upload an image");
      return;
    }

    addMenuItem({ name, price: Number(price), image });
    setName("");
    setPrice("");
    setImage(null);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Admin Dashboard</h1>

      <h2>Add New Menu Item</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && <img src={image} alt="preview" style={{ width: "100px", marginTop: "10px" }} />}
        <button onClick={handleAddItem} style={{ padding: "10px", background: "green", color: "white", border: "none", borderRadius: "5px" }}>
          Add Item
        </button>
      </div>

      <h2>Menu Items</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {menuItems.map((item) => (
          <div key={item.id} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "5px", width: "150px" }}>
            <img src={item.image} alt={item.name} style={{ width: "100%", height: "100px", objectFit: "cover" }} />
            <h4>{item.name}</h4>
            <p>Rs. {item.price}</p>
          </div>
        ))}
      </div>

      <h2>User Messages</h2>
      {messages.length === 0 ? <p>No messages yet.</p> : messages.map((msg) => (
        <div key={msg.id} style={{ border: "1px solid #eee", padding: "10px", marginBottom: "10px" }}>
          <p><strong>{msg.user}</strong>: {msg.text}</p>
        </div>
      ))}

      <h2>Reviews</h2>
      {reviews.length === 0 ? <p>No reviews yet.</p> : reviews.map((r) => (
        <div key={r.id} style={{ border: "1px solid #eee", padding: "10px", marginBottom: "10px" }}>
          <p><strong>{r.user}</strong>: {r.comment}</p>
        </div>
      ))}
    </div>
  );
}