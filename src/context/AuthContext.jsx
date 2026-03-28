import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // ✅ Load logged user from localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (savedUser) setUser(savedUser);
  }, []);

  // ✅ LOGIN
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

  // ✅ REGISTER (NO AUTO LOGIN)
  const register = (newUser) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
  };

  // ✅ LOGOUT
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