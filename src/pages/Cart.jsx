import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, clearCart, increaseQty, decreaseQty } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  return (
    <div style={{ padding: "40px", minHeight: "80vh", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Your Cart 🛒</h1>

      {cart.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px" }}>Cart is empty</p>
      ) : (
        <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
          {cart.map((item) => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eee", padding: "15px 0" }}>
              <div>
                <h3>{item.name}</h3>
                <p>Rs. {item.price}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {/* DECREASE BUTTON */}
                <button
                  onClick={() => decreaseQty(item.id)}
                  style={{
                    padding: "5px 12px",
                    cursor: "pointer",
                    backgroundColor: "#FFB84D", // soft golden/orange
                    border: "1px solid #FFA500",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  -
                </button>

                <span style={{ fontWeight: "bold", minWidth: "20px", textAlign: "center" }}>
                  {item.quantity}
                </span>

                {/* INCREASE BUTTON */}
                <button
                  onClick={() => increaseQty(item.id)}
                  style={{
                    padding: "5px 12px",
                    cursor: "pointer",
                    backgroundColor: "#FFB84D", // soft golden/orange
                    border: "1px solid #FFA500",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  +
                </button>
              </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <h3>Rs. {Number(item.price) * Number(item.quantity)}</h3>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "10px"
                  }}
                >
                  Remove ❌
                </button>
              </div>
            </div>
          ))}

          <h2 style={{ textAlign: "right", marginTop: "20px" }}>Total: Rs. {total}</h2>
          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <button
              onClick={clearCart}
              style={{
                marginRight: "10px",
                padding: "10px",
                background: "#666",
                color: "white",
                border: "none",
                borderRadius: "5px"
              }}
            >
              Clear Cart
            </button>
            <button
              style={{
                padding: "10px",
                background: "green",
                color: "white",
                border: "none",
                borderRadius: "5px"
              }}
            >
              Checkout ✅
            </button>
          </div>
        </div>
      )}
    </div>
  );
}