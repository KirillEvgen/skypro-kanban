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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuth(true);
      } catch (err) {
        console.error("Ошибка парсинга данных пользователя:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        setIsAuth(false);
        setUser(null);
      }
    } else {
      setIsAuth(false);
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login(credentials);

      const token = response.user.token;
      const userData = response.user;

      if (!token) {
        throw new Error("Токен не получен");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(userData));

      setUser(userData);
      setIsAuth(true);
      window.dispatchEvent(
        new CustomEvent("authStateChanged", { detail: { isAuth: true } })
      );
      return response;
    } catch (err) {
      console.error("Ошибка в login:", err);
      let errorMessage = "Ошибка входа";

      if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

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
      const token = response.user.token;
      const newUser = response.user;

      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(newUser));

      setUser(newUser);
      setIsAuth(true);
      window.dispatchEvent(
        new CustomEvent("authStateChanged", { detail: { isAuth: true } })
      );
      return response;
    } catch (err) {
      console.error("Ошибка в register:", err);
      let errorMessage = "Ошибка регистрации";

      if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

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
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    window.dispatchEvent(
      new CustomEvent("authStateChanged", { detail: { isAuth: false } })
    );
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
