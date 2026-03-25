import pizza from '../assets/pizza.jpeg';
import burger from '../assets/burger.jpeg';
import pasta from '../assets/pasta.jpeg';
import Fried_Rice from '../assets/Fried_Rice.jpg';
import Chicken_Kottu from '../assets/Chicken_Kottu.jpeg';
import Noodles from '../assets/Noodles.jpeg';

const items = [
  { id: 1, name: "Pizza", price: "$10", img: pizza },
  { id: 2, name: "Burger", price: "$8", img: burger },
  { id: 3, name: "Pasta", price: "$12", img: pasta },
  { id: 4, name: "Fried Rice", price: "$9", img: Fried_Rice },
  { id: 5, name: "Chicken Kottu", price: "$7", img: Chicken_Kottu },
  { id: 6, name: "Noodles", price: "$6", img: Noodles }
];

export default function Menu() {
  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Our Menu</h1>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        flexWrap: "wrap"
      }}>
        {items.map(item => (
          <div key={item.id} style={{
            border: "1px solid #ddd",
            width: "220px",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
          }}>
            <img
              src={item.img}
              alt={item.name}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />

            <div style={{ padding: "15px", textAlign: "center" }}>
              <h2>{item.name}</h2>
              <p>{item.price}</p>
              <button style={{
                background: "black",
                color: "white",
                padding: "8px 15px",
                border: "none",
                cursor: "pointer"
              }}>
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

