import { createContext, useContext, useState, useEffect } from "react";

// Create AuthContext
const AuthContext = createContext();

// ✅ AuthProvider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load logged-in user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("loggedUser");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Login function
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check for matching user
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("loggedUser", JSON.stringify(foundUser));
      return true;
    }

    return false;
  };

  // Register function
  const register = (newUser) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const emailExists = users.some((u) => u.email === newUser.email);
    if (emailExists)
      return { success: false, message: "Email already exists!" };

    // Save new user
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Auto-login after registration
    setUser(newUser);
    localStorage.setItem("loggedUser", JSON.stringify(newUser));

    return { success: true, message: "Registered successfully!" };
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);