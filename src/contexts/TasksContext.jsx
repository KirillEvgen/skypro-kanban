import React, { createContext, useContext, useState, useEffect } from "react";
import { tasksAPI } from "../services/api";
import { cardList } from "../data";

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
      console.log("Тип полученных данных:", typeof data);
      console.log("Является ли массивом:", Array.isArray(data));

      // Убеждаемся, что мы всегда работаем с массивом
      let tasksArray = [];
      if (Array.isArray(data)) {
        tasksArray = data;
      } else if (data && data.tasks && Array.isArray(data.tasks)) {
        tasksArray = data.tasks;
      } else {
        console.warn(
          "Неожиданная структура данных, устанавливаем пустой массив"
        );
        tasksArray = [];
      }

      // Если задач нет, создаем тестовые задачи
      if (tasksArray.length === 0) {
        console.log("Задач нет, создаем тестовые данные...");
        await createTestTasks();
      } else {
        setTasks(tasksArray);
      }
    } catch (err) {
      const errorMessage = err.message || "Ошибка при загрузке задач";
      setError(errorMessage);
      console.error("Ошибка загрузки задач:", err);
    } finally {
      setLoading(false);
    }
  };

  const createTestTasks = async () => {
    try {
      console.log("Создаем тестовые задачи...");
      const createdTasks = [];

      for (const taskData of cardList) {
        try {
          // Преобразуем дату в правильный формат
          const dateParts = taskData.date.split(".");
          const year =
            dateParts[2].length === 2 ? `20${dateParts[2]}` : dateParts[2];
          const formattedDate = `${year}-${dateParts[1].padStart(2, "0")}-${dateParts[0].padStart(2, "0")}`;

          const newTask = await tasksAPI.createTask({
            title: taskData.title,
            description: taskData.description,
            topic: taskData.topic,
            status: taskData.status,
            date: formattedDate,
          });
          createdTasks.push(newTask);
          console.log("Создана задача:", newTask);
        } catch (error) {
          console.error("Ошибка создания задачи:", taskData.title, error);
        }
      }

      console.log("Всего создано тестовых задач:", createdTasks.length);
      setTasks(createdTasks);
    } catch (error) {
      console.error("Ошибка создания тестовых задач:", error);
      setError("Ошибка создания тестовых задач");
    }
  };

  const createTask = async (taskData) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Создаем новую задачу:", taskData);
      const newTask = await tasksAPI.createTask(taskData);
      console.log("Задача создана:", newTask);
      console.log("Тип созданной задачи:", typeof newTask);
      console.log("ID созданной задачи:", newTask._id || newTask.id);
      console.log("Статус созданной задачи:", newTask.status);

      // Добавляем задачу в контекст
      setTasks((prev) => {
        console.log("Предыдущий список задач:", prev);
        console.log("Новая задача от API:", newTask);

        // Проверяем, что новая задача не дублируется
        const existingTask = prev.find(
          (task) =>
            (task._id && task._id === newTask._id) ||
            (task.id && task.id === newTask.id)
        );

        if (existingTask) {
          console.log("Задача уже существует, обновляем её:", existingTask);
          const updatedTasks = prev.map((task) =>
            (task._id && task._id === newTask._id) ||
            (task.id && task.id === newTask.id)
              ? newTask
              : task
          );
          console.log("Обновленный список задач после создания:", updatedTasks);
          return updatedTasks;
        } else {
          const updatedTasks = [...prev, newTask];
          console.log("Обновленный список задач после создания:", updatedTasks);
          return updatedTasks;
        }
      });
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
      console.log("Обновляем задачу с ID:", id, "данные:", taskData);
      const updatedTask = await tasksAPI.updateTask(id, taskData);
      console.log("Задача обновлена:", updatedTask);
      console.log("Тип обновленной задачи:", typeof updatedTask);
      console.log("ID обновленной задачи:", updatedTask._id || updatedTask.id);
      console.log("Статус обновленной задачи:", updatedTask.status);

      // Обновляем задачу в контексте
      setTasks((prev) => {
        console.log("Предыдущий список задач:", prev);
        console.log("Ищем задачу с ID:", id, "тип:", typeof id);
        console.log("Обновленная задача от API:", updatedTask);

        let found = false;
        const updatedTasks = prev.map((task) => {
          // Обновляем задачу по _id или id
          const taskId = task._id || task.id;
          const updateId = id;
          console.log(
            `Сравниваем: taskId=${taskId} (${typeof taskId}) с updateId=${updateId} (${typeof updateId})`
          );

          // Проверяем совпадение по строковому и числовому ID
          const isMatch =
            taskId === updateId ||
            taskId === parseInt(updateId) ||
            taskId === updateId.toString() ||
            (typeof taskId === "string" && taskId === updateId.toString()) ||
            (typeof updateId === "string" && updateId === taskId.toString());

          if (isMatch) {
            found = true;
            console.log(
              "Обновляем задачу в контексте:",
              taskId,
              "->",
              updatedTask
            );
            return updatedTask;
          }
          return task;
        });

        if (!found) {
          console.error("Задача с ID", id, "не найдена в контексте!");
          console.log(
            "Доступные задачи:",
            prev.map((t) => ({ id: t._id || t.id, title: t.title }))
          );
        }

        console.log("Обновленный список задач после обновления:", updatedTasks);

        // Проверяем, что задача действительно обновилась
        const updatedTaskInList = updatedTasks.find(
          (task) => (task._id && task._id === id) || (task.id && task.id === id)
        );

        if (updatedTaskInList) {
          console.log(
            "Задача успешно обновлена в контексте:",
            updatedTaskInList
          );
        } else {
          console.error("Задача не найдена в обновленном списке!");
        }

        console.log("Возвращаем обновленный список задач:", updatedTasks);
        return updatedTasks;
      });

      return updatedTask;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Ошибка при обновлении задачи";
      console.error("Ошибка обновления задачи:", err);
      console.error("Детали ошибки в контексте:", {
        message: err.message,
        response: err.response,
        status: err.status,
        stack: err.stack,
      });
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
      console.log("Удаляем задачу с ID:", id);
      await tasksAPI.deleteTask(id);

      // Удаляем задачу из контекста
      setTasks((prev) => {
        console.log("Предыдущий список задач:", prev);
        const updatedTasks = prev.filter((task) => {
          // Удаляем задачу по _id или id
          const taskId = task._id || task.id;
          const deleteId = id;
          const shouldKeep =
            taskId !== deleteId && taskId !== parseInt(deleteId);

          if (!shouldKeep) {
            console.log("Удаляем задачу из контекста:", taskId);
          }
          return shouldKeep;
        });
        console.log("Обновленный список задач после удаления:", updatedTasks);
        return updatedTasks;
      });
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
    console.log("Поиск задачи по ID:", id, "тип:", typeof id);
    console.log("Все задачи:", tasks);

    // Ищем по _id (строка) или id (число)
    const foundTask = tasks.find((task) => {
      console.log("Проверяем задачу:", task);
      console.log("task._id:", task._id, "task.id:", task.id);

      // Проверяем совпадение по _id (основной способ)
      const matchById = task._id === id;

      // Проверяем совпадение по id (числовое поле, если есть)
      const matchByNumericId = task.id === id || task.id === parseInt(id);

      console.log(
        "Совпадение по _id:",
        matchById,
        "Совпадение по id:",
        matchByNumericId
      );

      // Возвращаем true если есть совпадение по любому из полей
      const isMatch = matchById || matchByNumericId;
      console.log("Итоговое совпадение:", isMatch);

      return isMatch;
    });

    console.log("Найденная задача:", foundTask);
    return foundTask;
  };

  const getTasksByStatus = (status) => {
    console.log(`Фильтрация задач по статусу "${status}"`);
    console.log("Все задачи для фильтрации:", tasks);
    console.log(
      "Статусы всех задач:",
      tasks.map((task) => task.status)
    );

    const filteredTasks = tasks.filter((task) => {
      const matches = task.status === status;
      if (matches) {
        console.log(
          `Задача "${task.title}" (ID: ${task._id || task.id}) соответствует статусу "${status}"`
        );
      }
      return matches;
    });
    console.log(`Результат фильтрации для "${status}":`, filteredTasks);
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
