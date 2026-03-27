// src/pages/Contact.jsx
export default function Contact() {
  return (
    <div style={{ padding: "40px", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ marginBottom: "30px" }}>Contact Us</h1>

      {/* Contact Info */}
      <div style={{ maxWidth: "600px", margin: "auto", textAlign: "left", lineHeight: "1.8" }}>
        <h2>Our Contact Information</h2>
        <p><strong>Phone:</strong> +94 71 123 4567</p>
        <p><strong>Email:</strong> info@restaurant.com</p>
        <p><strong>Postal Address:</strong> 123 Main Street, Colombo, Sri Lanka</p>
        <p><strong>Business Hours:</strong> Mon - Sat: 9:00 AM - 9:00 PM</p>
        <p><strong>Website:</strong> www.restaurant.com</p>
      </div>
    </div>
  );
}