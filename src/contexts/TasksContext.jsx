import React, { createContext, useContext, useState, useEffect } from "react";
import { tasksAPI } from "../services/api";

const TasksContext = createContext();

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Загрузка задач при инициализации
  useEffect(() => {
    // Проверяем наличие токена для определения авторизации
    const token = localStorage.getItem("token");
    if (token) {
      loadTasks();
    }
  }, []);

  // Слушаем изменения в localStorage и кастомные события для синхронизации с AuthContext
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "token") {
        if (e.newValue) {
          loadTasks();
        } else {
          setTasks([]);
        }
      }
    };

    const handleAuthStateChange = (e) => {
      if (e.detail.isAuth) {
        loadTasks();
      } else {
        setTasks([]);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authStateChanged", handleAuthStateChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authStateChanged", handleAuthStateChange);
    };
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Начинаем загрузку задач...");
      const data = await tasksAPI.getTasks();
      console.log("Полученные задачи:", data);
      setTasks(data);
    } catch (err) {
      const errorMessage = err.message || "Ошибка при загрузке задач";
      setError(errorMessage);
      console.error("Ошибка загрузки задач:", err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    setLoading(true);
    setError(null);
    try {
      const newTask = await tasksAPI.createTask(taskData);
      setTasks((prev) => [...prev, newTask]);
      return newTask;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Ошибка при создании задачи";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id, taskData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedTask = await tasksAPI.updateTask(id, taskData);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
      return updatedTask;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Ошибка при обновлении задачи";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await tasksAPI.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Ошибка при удалении задачи";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getTaskById = (id) => {
    return tasks.find((task) => task.id === id);
  };

  const getTasksByStatus = (status) => {
    const filteredTasks = tasks.filter((task) => task.status === status);
    console.log(`Фильтрация задач по статусу "${status}":`, filteredTasks);
    return filteredTasks;
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    tasks,
    loading,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskById,
    getTasksByStatus,
    clearError,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
