import { createContext, useContext, useState, useEffect } from "react";
import { login as loginUser, logout as logoutUser } from "./authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => localStorage.getItem("access") || null);

  const login = async (email, password) => {
    const data = await loginUser(email, password);
    setUser(data.access);
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
