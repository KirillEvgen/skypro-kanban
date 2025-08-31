import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
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

  console.log("=== TasksProvider рендеринг ===");
  console.log("Текущие задачи:", tasks);
  console.log("Загрузка:", loading);
  console.log("Ошибка:", error);

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

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Начинаем загрузку задач...");
      const data = await tasksAPI.getTasks();
      console.log("Полученные задачи:", data);

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
  }, []);

  // Логируем изменения задач
  useEffect(() => {
    console.log("=== TasksContext: useEffect - Задачи изменились ===");
    console.log("Количество задач:", tasks.length);
    console.log("Задачи:", tasks);
    console.log(
      "Статусы задач:",
      tasks.map((t) => ({
        id: t._id || t.id,
        title: t.title,
        status: t.status,
      }))
    );
    console.log("=== Конец useEffect ===");
  }, [tasks]);

  const createTestTasks = useCallback(async () => {
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
  }, []);

  const createTask = useCallback(async (taskData) => {
    console.log("=== TasksContext: ФУНКЦИЯ createTask ВЫЗВАНА ===");
    console.log("Полученные данные:", taskData);

    setLoading(true);
    setError(null);
    try {
      console.log("=== TasksContext: Создаем новую задачу ===");
      console.log("Данные для создания:", taskData);
      const newTask = await tasksAPI.createTask(taskData);
      console.log("=== TasksContext: Задача создана на сервере ===");
      console.log("Ответ от сервера:", newTask);

      // Немедленно обновляем состояние контекста
      setTasks((prevTasks) => {
        console.log("=== TasksContext: Обновляем состояние после создания ===");
        console.log("Предыдущие задачи:", prevTasks);
        console.log("Новая задача:", newTask);

        const updatedTasks = [...prevTasks, newTask];
        console.log("Обновленный список задач:", updatedTasks);
        return updatedTasks;
      });

      // Принудительно обновляем состояние через setTimeout
      setTimeout(() => {
        setTasks((currentTasks) => {
          console.log("=== TasksContext: Принудительное обновление ===");
          console.log("Текущие задачи:", currentTasks);
          return [...currentTasks];
        });
      }, 0);

      console.log("=== TasksContext: Состояние обновлено ===");
      return newTask;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Ошибка при создании задачи";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTask = useCallback(async (id, taskData) => {
    console.log("=== TasksContext: Обновляем задачу ===");
    console.log("ID задачи:", id);
    console.log("Данные для обновления:", taskData);

    setLoading(true);
    setError(null);
    try {
      const updatedTask = await tasksAPI.updateTask(id, taskData);
      console.log("=== TasksContext: Задача обновлена на сервере ===");
      console.log("Обновленная задача:", updatedTask);

      // Немедленно обновляем состояние контекста
      setTasks((prevTasks) => {
        console.log(
          "=== TasksContext: Обновляем состояние после обновления ==="
        );
        console.log("Предыдущие задачи:", prevTasks);

        const updatedTasks = prevTasks.map((task) => {
          const taskId = task._id || task.id;
          const updateId = id;

          // Проверяем совпадение по ID
          const isMatch =
            taskId === updateId ||
            taskId === parseInt(updateId) ||
            taskId === updateId.toString() ||
            (typeof taskId === "string" && taskId === updateId.toString()) ||
            (typeof updateId === "string" && updateId === taskId.toString());

          if (isMatch) {
            console.log("Обновляем задачу в контексте:", taskId);
            return updatedTask;
          }
          return task;
        });

        console.log("Обновленный список задач:", updatedTasks);
        return updatedTasks;
      });

      // Принудительно обновляем состояние через setTimeout
      setTimeout(() => {
        setTasks((currentTasks) => {
          console.log(
            "=== TasksContext: Принудительное обновление после update ==="
          );
          console.log("Текущие задачи:", currentTasks);
          return [...currentTasks];
        });
      }, 0);

      console.log("=== TasksContext: Состояние обновлено ===");
      return updatedTask;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Ошибка при обновлении задачи";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTask = useCallback(async (id) => {
    console.log("=== TasksContext: Удаляем задачу ===");
    console.log("ID задачи:", id);

    setLoading(true);
    setError(null);
    try {
      await tasksAPI.deleteTask(id);
      console.log("=== TasksContext: Задача удалена на сервере ===");

      // Немедленно обновляем состояние контекста
      setTasks((prevTasks) => {
        console.log("=== TasksContext: Обновляем состояние после удаления ===");
        console.log("Предыдущие задачи:", prevTasks);

        const updatedTasks = prevTasks.filter((task) => {
          const taskId = task._id || task.id;
          const deleteId = id;
          const shouldKeep =
            taskId !== deleteId && taskId !== parseInt(deleteId);

          if (!shouldKeep) {
            console.log("Удаляем задачу из контекста:", taskId);
          }
          return shouldKeep;
        });

        console.log("Обновленный список задач:", updatedTasks);
        return updatedTasks;
      });

      // Принудительно обновляем состояние через setTimeout
      setTimeout(() => {
        setTasks((currentTasks) => {
          console.log(
            "=== TasksContext: Принудительное обновление после delete ==="
          );
          console.log("Текущие задачи:", currentTasks);
          return [...currentTasks];
        });
      }, 0);

      console.log("=== TasksContext: Состояние обновлено ===");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Ошибка при удалении задачи";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const getTaskById = useCallback(
    (id) => {
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
    },
    [tasks]
  );

  const getTasksByStatus = useCallback(
    (status) => {
      console.log(
        `=== TasksContext: Фильтрация задач по статусу "${status}" ===`
      );
      console.log("Все задачи для фильтрации:", tasks);
      console.log("Количество задач:", tasks.length);

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
      console.log(
        `Количество задач в колонке "${status}":`,
        filteredTasks.length
      );
      console.log("=== Конец фильтрации ===");
      return filteredTasks;
    },
    [tasks]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

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
