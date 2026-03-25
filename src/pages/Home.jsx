import hero from '../assets/hero.jpg';

export default function Home() {
  return (
    <div style={{
      height: "90vh",
      backgroundImage: `url(${hero})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      textAlign: "center"
    }}>
      <div style={{
        background: "rgba(0,0,0,0.6)",
        padding: "30px",
        borderRadius: "10px"
      }}>
        <h1 style={{ fontSize: "50px" }}>Delicious Foods 🍽️</h1>
        <p style={{ fontSize: "20px", margin: "10px 0" }}>
          Taste the best food in town
        </p>
        <button style={{
          padding: "10px 20px",
          background: "#ff4d4d",
          border: "none",
          color: "white",
          cursor: "pointer"
        }}>
          Explore Menu
        </button>
      </div>
    </div>
  );
}