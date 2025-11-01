/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedUser");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (email) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exist = users.find((u) => u.email === email);
    if (exist) {
      setUser(exist);
      localStorage.setItem("loggedUser", JSON.stringify(exist));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
