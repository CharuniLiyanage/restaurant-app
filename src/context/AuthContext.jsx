import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("loggedUser");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
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

  const register = (newUser) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = users.some((u) => u.email === newUser.email);
    if (emailExists) return { success: false, message: "Email already exists!" };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    return { success: true, message: "Registered successfully!" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);