import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import hero from '../assets/hero.jpg';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleExplore = () => {
    if (user) {
      navigate("/menu");
    } else {
      navigate("/login");
    }
  };

  return (
    <div style={{
      height: "100vh",           // full viewport height
      margin: 0,                 // remove body margin
      padding: 0,                // remove body padding
      backgroundImage: `url(${hero})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
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
        <h1 style={{ fontSize: "50px" }}>The Foodie Spot 🍽️</h1>
        <p style={{ fontSize: "20px", margin: "10px 0" }}>
          Bringing the Best Flavors to Your Table
        </p>
        <button
          onClick={handleExplore}
          style={{
            padding: "10px 20px",
            background: "#ff4d4d",
            border: "none",
            color: "white",
            cursor: "pointer"
          }}
        >
          Explore Menu
        </button>
      </div>
    </div>
  );
}