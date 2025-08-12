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
  // Проверяем localStorage при инициализации
  const [isAuth, setIsAuth] = useState(() => {
    const savedUser = localStorage.getItem("userData");
    return !!savedUser;
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("userData");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setIsAuth(true);
    setUser(userData);
    // Сохраняем данные пользователя в localStorage
    localStorage.setItem("userData", JSON.stringify(userData));
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
