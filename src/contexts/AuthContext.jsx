import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsAuth(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuth(false);
    setUser(null);
    // Очищаем данные пользователя из localStorage
    localStorage.removeItem("userData");
  };

  const value = {
    isAuth,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
