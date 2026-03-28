import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, clearCart, increaseQty, decreaseQty } = useContext(CartContext);

  const [orderModal, setOrderModal] = useState(false);
  const [step, setStep] = useState(1);
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    phone1: "",
    phone2: "",
    address: "",
    location: "",
    paymentMethod: "Cash", // default
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
  });
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  // Get current location
  const handleGetLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setOrderDetails({ ...orderDetails, location: `Lat: ${pos.coords.latitude}, Lng: ${pos.coords.longitude}` });
      },
      () => alert("Unable to get location")
    );
  };

  const handleConfirmOrder = () => {
    // Validation
    const { name, phone1, phone2, address, paymentMethod, cardNumber, cardExpiry, cardCVV } = orderDetails;
    if (!name || !phone1 || !phone2 || !address) return alert("Please fill all details!");
    if (paymentMethod === "Card" && (!cardNumber || !cardExpiry || !cardCVV)) return alert("Please fill card details!");

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push({ items: cart, details: orderDetails, total, date: new Date().toISOString() });
    localStorage.setItem("orders", JSON.stringify(orders));

    setOrderConfirmed(true);
    clearCart();
  };

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
                  <button onClick={() => decreaseQty(item.id)} style={{ padding: "5px 12px", cursor: "pointer", backgroundColor: "#FFB84D", border: "1px solid #FFA500", borderRadius: "5px", fontWeight: "bold", color: "#fff" }}>-</button>
                  <span style={{ fontWeight: "bold", minWidth: "20px", textAlign: "center" }}>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)} style={{ padding: "5px 12px", cursor: "pointer", backgroundColor: "#FFB84D", border: "1px solid #FFA500", borderRadius: "5px", fontWeight: "bold", color: "#fff" }}>+</button>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <h3>Rs. {Number(item.price) * Number(item.quantity)}</h3>
                <button onClick={() => removeFromCart(item.id)} style={{ background: "red", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer", marginTop: "10px" }}>Remove ❌</button>
              </div>
            </div>
          ))}

          <h2 style={{ textAlign: "right", marginTop: "20px" }}>Total: Rs. {total}</h2>
          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <button onClick={clearCart} style={{ marginRight: "10px", padding: "10px", background: "#666", color: "white", border: "none", borderRadius: "5px" }}>Clear Cart</button>
            <button onClick={() => { setOrderModal(true); setStep(1); }} style={{ padding: "10px", background: "green", color: "white", border: "none", borderRadius: "5px" }}>Checkout ✅</button>
          </div>
        </div>
      )}

      {/* Order Modal */}
      {orderModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ background: "white", padding: "30px", borderRadius: "10px", width: "400px", textAlign: "center" }}>
            {!orderConfirmed ? (
              <>
                {step === 1 && (
                  <>
                    <h2>Order Details</h2>
                    <input type="text" placeholder="Name" value={orderDetails.name} onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })} style={{ width: "100%", padding: "10px", margin: "10px 0" }} />
                    <input type="text" placeholder="Phone 1" value={orderDetails.phone1} onChange={(e) => setOrderDetails({ ...orderDetails, phone1: e.target.value })} style={{ width: "100%", padding: "10px", margin: "10px 0" }} />
                    <input type="text" placeholder="Phone 2" value={orderDetails.phone2} onChange={(e) => setOrderDetails({ ...orderDetails, phone2: e.target.value })} style={{ width: "100%", padding: "10px", margin: "10px 0" }} />
                    <input type="text" placeholder="Address" value={orderDetails.address} onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })} style={{ width: "100%", padding: "10px", margin: "10px 0" }} />
                    <button onClick={handleGetLocation} style={{ padding: "10px", background: "#0d6efd", color: "white", border: "none", borderRadius: "5px", marginBottom: "10px" }}>Get Current Location</button>
                    <p style={{ fontSize: "0.9rem", color: "#555" }}>{orderDetails.location}</p>
                    <button onClick={() => setStep(2)} style={{ padding: "10px", background: "green", color: "white", border: "none", borderRadius: "5px" }}>Next ➡️</button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2>Payment Details</h2>
                    <div style={{ margin: "10px 0", textAlign: "left" }}>
                      <label>
                        <input type="radio" checked={orderDetails.paymentMethod === "Cash"} onChange={() => setOrderDetails({ ...orderDetails, paymentMethod: "Cash" })} />
                        Cash on Delivery
                      </label><br />
                      <label>
                        <input type="radio" checked={orderDetails.paymentMethod === "Card"} onChange={() => setOrderDetails({ ...orderDetails, paymentMethod: "Card" })} />
                        Card Payment
                      </label>
                    </div>

                    {orderDetails.paymentMethod === "Card" && (
                      <div>
                        <input type="text" placeholder="Card Number" value={orderDetails.cardNumber} onChange={(e) => setOrderDetails({ ...orderDetails, cardNumber: e.target.value })} style={{ width: "100%", padding: "10px", margin: "10px 0" }} />
                        <input type="text" placeholder="Expiry MM/YY" value={orderDetails.cardExpiry} onChange={(e) => setOrderDetails({ ...orderDetails, cardExpiry: e.target.value })} style={{ width: "100%", padding: "10px", margin: "10px 0" }} />
                        <input type="text" placeholder="CVV" value={orderDetails.cardCVV} onChange={(e) => setOrderDetails({ ...orderDetails, cardCVV: e.target.value })} style={{ width: "100%", padding: "10px", margin: "10px 0" }} />
                      </div>
                    )}

                    <button onClick={handleConfirmOrder} style={{ padding: "10px", background: "green", color: "white", border: "none", borderRadius: "5px", marginTop: "10px" }}>Confirm Order ✅</button>
                    <button onClick={() => setStep(1)} style={{ padding: "10px", background: "gray", color: "white", border: "none", borderRadius: "5px", marginTop: "10px", marginLeft: "10px" }}>Back ⬅️</button>
                  </>
                )}
              </>
            ) : (
              <>
                <h2>Order Placed Successfully! 🎉</h2>
                <button onClick={() => setOrderModal(false)} style={{ padding: "10px", background: "green", color: "white", border: "none", borderRadius: "5px", marginTop: "10px" }}>Close</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}