// src/context/AdminContext.jsx
import { createContext, useContext, useState } from "react";

// 1. Create context
export const AdminContext = createContext();

// 2. Provider component
export function AdminProvider({ children }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [messages, setMessages] = useState([]);
  const [reviews, setReviews] = useState([]);

  const login = (password) => {
    if (password === "admin123") {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAdminLoggedIn(false);

  const addMenuItem = (item) => setMenuItems((prev) => [...prev, { ...item, id: Date.now() }]);
  const addMessage = (message) => setMessages((prev) => [...prev, { ...message, id: Date.now() }]);
  const addReview = (review) => setReviews((prev) => [...prev, { ...review, id: Date.now() }]);

  return (
    <AdminContext.Provider
      value={{
        isAdminLoggedIn,
        login,
        logout,
        menuItems,
        addMenuItem,
        messages,
        addMessage,
        reviews,
        addReview,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

// 3. Custom hook to use context
export const useAdmin = () => useContext(AdminContext);