import { useAdmin } from "../context/AdminContext";

export default function AdminOrders() {
  const { orders, confirmOrder, removeOrder } = useAdmin();

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Customer Orders</h1>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No orders yet.</p>
      ) : (
        orders.map((order, idx) => (
          <div key={idx} style={{ background: "#fff", padding: "20px", marginBottom: "20px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
            <h3>Customer: {order.details.name}</h3>
            <p>Phone: {order.details.phone1}, {order.details.phone2}</p>
            <p>Address: {order.details.address}</p>
            <p>Total: Rs. {order.total}</p>
            <p>Date: {new Date(order.date).toLocaleString()}</p>
            <div>
              <h4>Items:</h4>
              {order.items.map(item => (
                <p key={item.id}>{item.name} x {item.quantity} = Rs. {item.price * item.quantity}</p>
              ))}
            </div>

            {!order.confirmed ? (
              <button 
                onClick={() => confirmOrder(order.date)} 
                style={{ padding: "8px 15px", backgroundColor: "green", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
              >
                Confirm Order ✅
              </button>
            ) : (
              <button 
                onClick={() => removeOrder(order.date)} 
                style={{ padding: "8px 15px", backgroundColor: "red", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
              >
                Remove Order ❌
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}