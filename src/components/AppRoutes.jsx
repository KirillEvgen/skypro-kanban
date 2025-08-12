import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AddTaskPage from "../pages/AddTaskPage";
import EditTaskPage from "../pages/EditTaskPage";
import CardPage from "../pages/CardPage";
import LogoutPage from "../pages/LogoutPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";

// Компонент для защищенной 404 страницы
const ProtectedNotFoundPage = () => {
  return (
    <ProtectedRoute>
      <NotFoundPage isProtected={true} />
    </ProtectedRoute>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Публичные маршруты */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Защищенные маршруты */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-task"
        element={
          <ProtectedRoute>
            <AddTaskPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-task/:id"
        element={
          <ProtectedRoute>
            <EditTaskPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/card/:id"
        element={
          <ProtectedRoute>
            <CardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/exit"
        element={
          <ProtectedRoute>
            <LogoutPage />
          </ProtectedRoute>
        }
      />

      {/* Защищенная страница 404 для авторизованных пользователей */}
      <Route path="/404" element={<ProtectedNotFoundPage />} />

      {/* Публичная страница 404 для неавторизованных пользователей */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
