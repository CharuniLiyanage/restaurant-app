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
  const [orders, setOrders] = useState([]);
  const addOrder = (order) => setOrders((prev) => [...prev, { ...order, id: Date.now() }]);

  // -------------------------
  // MESSAGES
  // -------------------------
  const [messages, setMessages] = useState([]);
  const addMessage = (msg) => setMessages((prev) => [...prev, { ...msg, id: Date.now() }]);

  // -------------------------
  // -------------------------
// RESERVATIONS (FIXED)
// -------------------------
  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem("reservations");
    return saved ? JSON.parse(saved) : [];
  });

  // save to localStorage whenever change
  useEffect(() => {
    localStorage.setItem("reservations", JSON.stringify(reservations));
  }, [reservations]);

  const addReservation = (reservation) => {
    setReservations((prev) => [
      ...prev,
      {
        ...reservation,
        id: Date.now(),
        status: "Pending", // default
      },
    ]);
  };

const updateReservationStatus = (id, status) => {
  setReservations((prev) =>
    prev.map((r) =>
      r.id === id ? { ...r, status } : r
    )
  );
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

  // DELETE ONE
  const deleteReservation = (id) => {
    setReservations((prev) => prev.filter((r) => r.id !== id));
  };

  // CLEAR ALL
  const clearReservations = () => {
    setReservations([]);
  };


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
        messages,
        addMessage,
        reservations,
        addReservation,
        updateReservationStatus,
        reviews,
        addReview,
        login,
        logout,
        isAdminLoggedIn,
        deleteReservation, 
        clearReservations 
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);