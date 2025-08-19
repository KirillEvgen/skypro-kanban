import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuth, loading } = useAuth();

  // Показываем загрузку, пока проверяем авторизацию
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
        }}
      >
        Загрузка...
      </div>
    );
  }

  if (!isAuth) {
    // Если пользователь не авторизован, перенаправляем на страницу входа
    return <Navigate to="/login" replace />;
  }

  // Если пользователь авторизован, отображаем защищенный контент
  return children;
};

export default ProtectedRoute;
