import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Проверяем токен при инициализации
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuth = async () => {
    try {
      const userData = await authAPI.getProfile();
      setUser(userData);
      setIsAuth(true);
    } catch (err) {
      // Если токен недействителен, очищаем localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      setIsAuth(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login(credentials);
      const { token, user: userData } = response;

      // Сохраняем токен и данные пользователя
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(userData));

      setUser(userData);
      setIsAuth(true);
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Ошибка входа";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.register(userData);
      const { token, user: newUser } = response;

      // Сохраняем токен и данные пользователя
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(newUser));

      setUser(newUser);
      setIsAuth(true);
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Ошибка регистрации";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuth(false);
    setUser(null);
    setError(null);
    // Очищаем данные пользователя из localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    isAuth,
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
