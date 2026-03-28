// src/context/AdminContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

export const AdminContext = createContext();

export function AdminProvider({ children }) {
  // -------------------------
  // MENU ITEMS
  // -------------------------
  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem("menuItems");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("menuItems", JSON.stringify(menuItems));
  }, [menuItems]);

  // -------------------------
  // ORDERS
  // -------------------------
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  const addOrder = (order) => {
    const newOrder = { ...order, id: Date.now(), confirmed: false }; // add confirmed flag
    setOrders((prev) => {
      const updated = [...prev, newOrder];
      localStorage.setItem("orders", JSON.stringify(updated));
      return updated;
    });
  };

  const confirmOrder = (id) => {
    setOrders((prev) => {
      const updated = prev.map((o) => (o.id === id ? { ...o, confirmed: true } : o));
      localStorage.setItem("orders", JSON.stringify(updated));
      return updated;
    });
  };

  const removeOrder = (id) => {
    setOrders((prev) => {
      const updated = prev.filter((o) => o.id !== id);
      localStorage.setItem("orders", JSON.stringify(updated));
      return updated;
    });
  };

  // -------------------------
  // MESSAGES
  // -------------------------
  const [messages, setMessages] = useState([]);
  const addMessage = (msg) => setMessages((prev) => [...prev, { ...msg, id: Date.now() }]);

  // -------------------------
  // RESERVATIONS
  // -------------------------
  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem("reservations");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("reservations", JSON.stringify(reservations));
  }, [reservations]);

  const addReservation = (reservation) => {
    setReservations((prev) => [
      ...prev,
      { ...reservation, id: Date.now(), status: "Pending" }
    ]);
  };

  const updateReservationStatus = (id, status) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const deleteReservation = (id) => {
    setReservations((prev) => prev.filter((r) => r.id !== id));
  };

  const clearReservations = () => {
    setReservations([]);
  };

  // -------------------------
  // REVIEWS
  // -------------------------
  const [reviews, setReviews] = useState([]);
  const addReview = (review) => setReviews((prev) => [...prev, { ...review, id: Date.now() }]);

  // -------------------------
  // ADMIN LOGIN
  // -------------------------
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const login = (password) => {
    if (password === "admin123") {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };
  const logout = () => setIsAdminLoggedIn(false);

  // -------------------------
  // MENU OPERATIONS
  // -------------------------
  const addMenuItem = (item) => setMenuItems((prev) => [...prev, item]);
  const deleteItem = (id) => setMenuItems((prev) => prev.filter((item) => item.id !== id));
  const updateItem = (updatedItem) =>
    setMenuItems((prev) => prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)));

  // -------------------------
  // PROVIDER VALUE
  // -------------------------
  return (
    <AdminContext.Provider
      value={{
        menuItems,
        addMenuItem,
        deleteItem,
        updateItem,

        orders,
        addOrder,
        confirmOrder,
        removeOrder,

        messages,
        addMessage,

        reservations,
        addReservation,
        updateReservationStatus,
        deleteReservation,
        clearReservations,

        reviews,
        addReview,

        login,
        logout,
        isAdminLoggedIn
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);