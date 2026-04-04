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

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order) => setOrders((prev) => [...prev, { ...order, confirmed: false }]);
  const confirmOrder = (date) => setOrders((prev) => prev.map((o) => o.date === date ? { ...o, confirmed: true } : o));
  const removeOrder = (date) => setOrders((prev) => prev.filter((o) => o.date !== date));

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

  const addReservation = (reservation) => setReservations((prev) => [...prev, { ...reservation, id: Date.now(), status: "Pending" }]);
  const updateReservationStatus = (id, status) => setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  const deleteReservation = (id) => setReservations((prev) => prev.filter((r) => r.id !== id));
  const clearReservations = () => setReservations([]);

  // -------------------------
  // REVIEWS
  // -------------------------
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem("reviews");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (review) => setReviews((prev) => [...prev, { ...review, id: Date.now() }]);

  // -------------------------
  // ADMIN LOGIN (with persistence)
  // -------------------------
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    const saved = localStorage.getItem("isAdminLoggedIn");
    return saved ? JSON.parse(saved) : false;
  });

  const login = (password) => {
    if (password === "admin123") {
      setIsAdminLoggedIn(true);
      localStorage.setItem("isAdminLoggedIn", "true"); // persist login
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("isAdminLoggedIn");
  };

  // -------------------------
  // MENU OPERATIONS
  // -------------------------
  const addMenuItem = (item) => setMenuItems((prev) => [...prev, item]);
  const deleteMenuItem = (id) => setMenuItems((prev) => prev.filter((item) => item.id !== id));
  const updateMenuItem = (updatedItem) => setMenuItems((prev) => prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)));

  const updateItem = updateMenuItem;
  const deleteItem = deleteMenuItem;

  // -------------------------
  // PROVIDER
  // -------------------------
  return (
    <AdminContext.Provider
      value={{
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        updateItem,
        deleteItem,

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