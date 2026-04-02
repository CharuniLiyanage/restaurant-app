import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer style={{
      background: "#111",
      color: "#fff",
      textAlign: "center",
      padding: "30px 20px",
      fontFamily: "'Arial', sans-serif",
      fontSize: "14px",
      lineHeight: "1.6",
    }}>
      
      {/* Contact Info */}
      <div style={{ marginBottom: "15px" }}>
        <p style={{ margin: "5px 0" }}>📞 +94 77 123 4567 | ✉️ contact@deliciousbites.com</p>
        <p style={{ margin: "5px 0" }}>🏠 123 Main Street, Colombo, Sri Lanka</p>
      </div>

      {/* Social Media Icons */}
      <div style={{ margin: "15px 0" }}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
          style={{
            display: "inline-block",
            background: "#4267B2",
            color: "#fff",
            width: "40px",
            height: "40px",
            lineHeight: "40px",
            borderRadius: "50%",
            textAlign: "center",
            margin: "0 8px",
            transition: "all 0.3s ease",
            fontSize: "18px"
          }}
        >
          <FaFacebookF />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
          style={{
            display: "inline-block",
            background: "#C13584",
            color: "#fff",
            width: "40px",
            height: "40px",
            lineHeight: "40px",
            borderRadius: "50%",
            textAlign: "center",
            margin: "0 8px",
            transition: "all 0.3s ease",
            fontSize: "18px"
          }}
        >
          <FaInstagram />
        </a>
      </div>

      {/* Copyright */}
      <p style={{ marginTop: "10px", fontSize: "13px", color: "#ccc" }}>
        © 2026 Delicious Bites. All rights reserved.
      </p>
    </footer>
  );
}