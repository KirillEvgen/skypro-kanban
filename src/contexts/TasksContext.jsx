import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { tasksAPI } from "../services/api";
import {
  showSuccess,
  showError,
  showLoading,
  updateToast,
} from "../utils/notifications";

const TasksContext = createContext();

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState({ tasks: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await tasksAPI.getTasks();

      let tasksArray = [];
      if (Array.isArray(data)) {
        tasksArray = data;
      } else if (data && data.tasks && Array.isArray(data.tasks)) {
        tasksArray = data.tasks;
      } else {
        tasksArray = [];
      }

      // Устанавливаем задачи пользователя (может быть пустой массив)
      if (data && data.tasks && Array.isArray(data.tasks)) {
        setTasks(data);
      } else {
        setTasks({ tasks: tasksArray });
      }
    } catch (err) {
      const errorMessage = err.message || "Ошибка при загрузке задач";
      setError(errorMessage);
      console.error("Ошибка загрузки задач:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async (taskData) => {
    setLoading(true);
    setError(null);
    const toastId = showLoading("Создание задачи...");

    try {
      const newTask = await tasksAPI.createTask(taskData);

      setTasks((prevTasks) => {
        let tasksArray = prevTasks;
        if (prevTasks && prevTasks.tasks && Array.isArray(prevTasks.tasks)) {
          tasksArray = prevTasks.tasks;
        } else if (Array.isArray(prevTasks)) {
          tasksArray = prevTasks;
        }

        const updatedTasks = [...tasksArray, newTask];

        if (prevTasks && prevTasks.tasks && Array.isArray(prevTasks.tasks)) {
          return { ...prevTasks, tasks: updatedTasks };
        }
        return { tasks: updatedTasks };
      });

      updateToast(toastId, "success", "Задача успешно создана!");
      return newTask;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Ошибка при создании задачи";
      setError(errorMessage);
      updateToast(toastId, "error", errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTask = useCallback(async (id, taskData) => {
    setLoading(true);
    setError(null);
    const toastId = showLoading("Обновление задачи...");

    try {
      const updatedTask = await tasksAPI.updateTask(id, taskData);

      setTasks((prevTasks) => {
        const tasksArray = prevTasks.tasks || [];

        const updatedTasks = tasksArray.map((task) => {
          const taskId = task._id || task.id;

          if (taskId === id) {
            return updatedTask;
          }
          return task;
        });

        return { ...prevTasks, tasks: updatedTasks };
      });

      updateToast(toastId, "success", "Задача успешно обновлена!");
      return updatedTask;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Ошибка при обновлении задачи";
      setError(errorMessage);
      updateToast(toastId, "error", errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTask = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    const toastId = showLoading("Удаление задачи...");

    try {
      await tasksAPI.deleteTask(id);

      setTasks((prevTasks) => {
        let tasksArray = prevTasks;
        if (prevTasks && prevTasks.tasks && Array.isArray(prevTasks.tasks)) {
          tasksArray = prevTasks.tasks;
        } else if (Array.isArray(prevTasks)) {
          tasksArray = prevTasks;
        }

        const updatedTasks = tasksArray.filter((task) => {
          const taskId = task._id || task.id;
          const deleteId = id;
          const shouldKeep =
            taskId !== deleteId && taskId !== parseInt(deleteId);

          return shouldKeep;
        });

        if (prevTasks && prevTasks.tasks && Array.isArray(prevTasks.tasks)) {
          return { ...prevTasks, tasks: updatedTasks };
        }
        return { tasks: updatedTasks };
      });

      updateToast(toastId, "success", "Задача успешно удалена!");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Ошибка при удалении задачи";
      setError(errorMessage);
      updateToast(toastId, "error", errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const getTaskById = useCallback(
    (id) => {
      let tasksArray = tasks;
      if (tasks && tasks.tasks && Array.isArray(tasks.tasks)) {
        tasksArray = tasks.tasks;
      } else if (!Array.isArray(tasks)) {
        return null;
      }

      const foundTask = tasksArray.find((task) => {
        const matchById = task._id === id;
        const matchByNumericId = task.id === id || task.id === parseInt(id);

        return matchById || matchByNumericId;
      });

      return foundTask;
    },
    [tasks]
  );

  const getTasksByStatus = useCallback(
    (status) => {
      let tasksArray = tasks;
      if (tasks && tasks.tasks && Array.isArray(tasks.tasks)) {
        tasksArray = tasks.tasks;
      } else if (!Array.isArray(tasks)) {
        return [];
      }

      const filteredTasks = tasksArray.filter((task) => {
        return task.status === status;
      });

      return filteredTasks;
    },
    [tasks]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadTasks();
    }
  }, [loadTasks]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "token") {
        if (e.newValue) {
          loadTasks();
        } else {
          setTasks({ tasks: [] });
        }
      }
    };

    const handleAuthStateChange = (e) => {
      if (e.detail.isAuth) {
        loadTasks();
      } else {
        setTasks({ tasks: [] });
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authStateChanged", handleAuthStateChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authStateChanged", handleAuthStateChange);
    };
  }, [loadTasks]);

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
