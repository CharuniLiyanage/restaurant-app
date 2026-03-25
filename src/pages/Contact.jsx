export default function Contact() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Contact Us</h1>

      <form style={{
        maxWidth: "400px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }}>
        <input placeholder="Name" style={{ padding: "10px" }} />
        <input placeholder="Email" style={{ padding: "10px" }} />
        <textarea placeholder="Message" style={{ padding: "10px" }} />
        <button style={{
          background: "black",
          color: "white",
          padding: "10px",
          border: "none"
        }}>
          Send Message
        </button>
      </form>
    </div>
  );
}