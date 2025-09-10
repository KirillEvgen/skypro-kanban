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
  const [tasks, setTasks] = useState({ tasks: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("=== TasksProvider рендеринг ===");
  console.log("Текущие задачи:", tasks);
  console.log("Загрузка:", loading);
  console.log("Ошибка:", error);

  // Сначала определяем все функции
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
      // Сохраняем в том же формате, что и API
      if (createdTasks.length > 0) {
        setTasks({ tasks: createdTasks });
      } else {
        setTasks({ tasks: [] });
      }
    } catch (error) {
      console.error("Ошибка создания тестовых задач:", error);
      setError("Ошибка создания тестовых задач");
    }
  }, []);

  const loadTasks = useCallback(async () => {
    console.log("=== TasksContext: loadTasks ВЫЗВАНА ===");
    setLoading(true);
    setError(null);
    try {
      console.log("Начинаем загрузку задач...");
      const data = await tasksAPI.getTasks();
      console.log("=== TasksContext: Полученные задачи ===");
      console.log("Данные:", data);
      console.log("Тип данных:", typeof data);
      console.log("Ключи данных:", Object.keys(data || {}));

      // Убеждаемся, что мы всегда работаем с массивом
      let tasksArray = [];
      if (Array.isArray(data)) {
        tasksArray = data;
        console.log("Данные являются массивом");
      } else if (data && data.tasks && Array.isArray(data.tasks)) {
        tasksArray = data.tasks;
        console.log("Используем data.tasks как массив");
      } else {
        console.warn(
          "Неожиданная структура данных, устанавливаем пустой массив"
        );
        tasksArray = [];
      }

      console.log("Количество задач в массиве:", tasksArray.length);

      // Если задач нет, создаем тестовые задачи
      if (tasksArray.length === 0) {
        console.log("Задач нет, создаем тестовые данные...");
        await createTestTasks();
      } else {
        // Сохраняем данные в том же формате, что приходят от API
        if (data && data.tasks && Array.isArray(data.tasks)) {
          console.log("Сохраняем data как есть:", data);
          setTasks(data); // Сохраняем весь объект { tasks: [...] }
          console.log("=== Состояние должно обновиться на:", data);
        } else {
          console.log("Оборачиваем массив в объект:", { tasks: tasksArray });
          setTasks({ tasks: tasksArray }); // Оборачиваем массив в объект
          console.log("=== Состояние должно обновиться на:", {
            tasks: tasksArray,
          });
        }
        console.log("=== setTasks ВЫЗВАНА ===");
      }
    } catch (err) {
      const errorMessage = err.message || "Ошибка при загрузке задач";
      setError(errorMessage);
      console.error("Ошибка загрузки задач:", err);
    } finally {
      setLoading(false);
      console.log("=== TasksContext: loadTasks ЗАВЕРШЕНА ===");
    }
  }, [createTestTasks]);

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

      // Обновляем состояние контекста
      setTasks((prevTasks) => {
        console.log("=== TasksContext: Обновляем состояние после создания ===");
        console.log("Предыдущие задачи:", prevTasks);
        console.log("Новая задача:", newTask);

        // Проверяем структуру данных
        let tasksArray = prevTasks;
        if (prevTasks && prevTasks.tasks && Array.isArray(prevTasks.tasks)) {
          tasksArray = prevTasks.tasks;
        } else if (Array.isArray(prevTasks)) {
          tasksArray = prevTasks;
        }

        const updatedTasks = [...tasksArray, newTask];
        console.log("Обновленный список задач:", updatedTasks);

        // Возвращаем ту же структуру, что была в prevTasks
        if (prevTasks && prevTasks.tasks && Array.isArray(prevTasks.tasks)) {
          return { ...prevTasks, tasks: updatedTasks };
        }
        return { tasks: updatedTasks };
      });

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

      // Обновляем состояние контекста
      setTasks((prevTasks) => {
        console.log(
          "=== TasksContext: Обновляем состояние после обновления ==="
        );
        console.log("Предыдущие задачи:", prevTasks);

        // Получаем массив задач из структуры
        const tasksArray = prevTasks.tasks || [];
        console.log("Массив задач для обновления:", tasksArray);

        const updatedTasks = tasksArray.map((task) => {
          const taskId = task._id || task.id;

          // Простая проверка совпадения по ID
          if (taskId === id) {
            console.log("Обновляем задачу в контексте:", taskId);
            return updatedTask;
          }
          return task;
        });

        console.log("Обновленный список задач:", updatedTasks);

        // Возвращаем обновленную структуру
        return { ...prevTasks, tasks: updatedTasks };
      });

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

      // Обновляем состояние контекста
      setTasks((prevTasks) => {
        console.log("=== TasksContext: Обновляем состояние после удаления ===");
        console.log("Предыдущие задачи:", prevTasks);

        // Проверяем структуру данных
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

          if (!shouldKeep) {
            console.log("Удаляем задачу из контекста:", taskId);
          }
          return shouldKeep;
        });

        console.log("Обновленный список задач:", updatedTasks);

        // Возвращаем ту же структуру, что была в prevTasks
        if (prevTasks && prevTasks.tasks && Array.isArray(prevTasks.tasks)) {
          return { ...prevTasks, tasks: updatedTasks };
        }
        return { tasks: updatedTasks };
      });

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

      // Получаем массив задач из правильной структуры
      let tasksArray = tasks;
      if (tasks && tasks.tasks && Array.isArray(tasks.tasks)) {
        tasksArray = tasks.tasks;
      } else if (!Array.isArray(tasks)) {
        console.warn("Задачи не являются массивом:", tasks);
        return null;
      }

      // Ищем по _id (строка) или id (число)
      const foundTask = tasksArray.find((task) => {
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
      console.log("Тип tasks:", typeof tasks);
      console.log("tasks.tasks:", tasks?.tasks);

      // Получаем массив задач из правильной структуры
      let tasksArray = tasks;
      if (tasks && tasks.tasks && Array.isArray(tasks.tasks)) {
        tasksArray = tasks.tasks;
        console.log("Используем tasks.tasks как массив");
      } else if (!Array.isArray(tasks)) {
        console.warn("Задачи не являются массивом:", tasks);
        return [];
      } else {
        console.log("Используем tasks как массив");
      }

      console.log("Количество задач:", tasksArray.length);
      console.log("Все задачи в массиве:", tasksArray);
      console.log(
        "Статусы всех задач:",
        tasksArray.map((t) => t.status)
      );

      const filteredTasks = tasksArray.filter((task) => {
        const matches = task.status === status;
        console.log(
          `Проверяем задачу "${task.title}": статус "${task.status}" === "${status}" = ${matches}`
        );
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

  // Теперь определяем useEffect после всех функций
  useEffect(() => {
    // Проверяем наличие токена для определения авторизации
    const token = localStorage.getItem("token");
    if (token) {
      loadTasks();
    }
  }, [loadTasks]);

  // Слушаем изменения в localStorage и кастомные события для синхронизации с AuthContext
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

  // Логируем изменения задач
  useEffect(() => {
    console.log("=== TasksContext: useEffect - Задачи изменились ===");
    console.log("Новое значение tasks:", tasks);
    console.log("Тип tasks:", typeof tasks);
    console.log("tasks.tasks:", tasks?.tasks);

    // Получаем массив задач из правильной структуры
    let tasksArray = tasks;
    if (tasks && tasks.tasks && Array.isArray(tasks.tasks)) {
      tasksArray = tasks.tasks;
      console.log("Используем tasks.tasks, количество:", tasksArray.length);
    } else if (Array.isArray(tasks)) {
      tasksArray = tasks;
      console.log(
        "Используем tasks как массив, количество:",
        tasksArray.length
      );
    } else {
      console.warn("Задачи не являются массивом:", tasks);
      return;
    }

    console.log("Количество задач:", tasksArray.length);
    console.log("Задачи:", tasksArray);
    console.log(
      "Статусы задач:",
      tasksArray.map((t) => ({
        id: t._id || t.id,
        title: t.title,
        status: t.status,
      }))
    );
    console.log("=== Конец useEffect ===");
  }, [tasks]);

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
