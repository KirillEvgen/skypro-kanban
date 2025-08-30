import axios from "axios";

// Базовый URL API - используем правильный адрес
const API_BASE_URL = "https://wedev-api.sky.pro/api";

// Создаем экземпляр axios с базовой конфигурацией для защищенных запросов
const api = axios.create({
  baseURL: `${API_BASE_URL}/kanban`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Интерцептор для добавления токена к защищенным запросам
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Отправляем токен:", token);
      console.log("Заголовки запроса:", config.headers);
    } else {
      console.log("Токен не найден в localStorage");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Интерцептор для обработки ошибок защищенных запросов
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Если токен истек, очищаем localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      // Не перенаправляем автоматически, пусть компоненты сами решают
    }
    return Promise.reject(error);
  }
);

// API для авторизации
export const authAPI = {
  // Регистрация
  register: async (userData) => {
    try {
      console.log("Отправляем данные для регистрации:", userData);

      const requestData = {
        login: userData.email, // используем email как login
        name: userData.name,
        password: userData.password,
      };

      console.log("Данные для отправки:", requestData);

      const response = await fetch(`${API_BASE_URL}/user`, {
        method: "POST",
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка регистрации");
      }

      const data = await response.json();
      console.log("Успешная регистрация:", data);
      return data;
    } catch (error) {
      console.error("Ошибка регистрации:", error);
      throw error;
    }
  },

  // Вход
  login: async (credentials) => {
    try {
      console.log("Отправляем данные для входа:", credentials);

      const requestData = {
        login: credentials.email, // используем email как login
        password: credentials.password,
      };

      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка входа");
      }

      const data = await response.json();
      console.log("Успешный вход:", data);
      console.log("Токен из ответа:", data.token);
      console.log("Пользователь из ответа:", data.user);
      console.log("Все поля ответа:", Object.keys(data));
      console.log("Полный ответ:", JSON.stringify(data, null, 2));
      console.log("Тип возвращаемых данных:", typeof data);
      console.log("Возвращаем из API:", data);

      // Логируем информацию о токене для отладки
      if (data.user && data.user.token) {
        const token = data.user.token;
        console.log("Длина токена:", token.length);
        console.log("Токен:", token);
      }

      return data;
    } catch (error) {
      console.error("Ошибка входа:", error);
      throw error;
    }
  },
};

// API для задач
export const tasksAPI = {
  // Получение всех задач
  getTasks: async () => {
    try {
      console.log("Запрашиваем задачи...");
      const token = localStorage.getItem("token");
      console.log("Токен из localStorage:", token);

      if (!token) {
        throw new Error("Токен не найден");
      }

      console.log("Отправляем запрос с токеном:", token);
      console.log("URL запроса:", `${API_BASE_URL}/kanban`);

      const response = await fetch(`${API_BASE_URL}/kanban`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Статус ответа задач:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Ошибка API задач:", errorData);
        throw new Error(errorData.error || "Ошибка получения задач");
      }

      const data = await response.json();
      console.log("Ответ от API задач:", data);
      console.log("Тип данных:", typeof data);
      console.log("Ключи данных:", Object.keys(data));
      console.log("Структура данных:", JSON.stringify(data, null, 2));

      // Проверяем, есть ли массив задач в ответе
      if (data && data.tasks && Array.isArray(data.tasks)) {
        console.log("Найден массив задач в data.tasks:", data.tasks);
        return data.tasks;
      } else if (Array.isArray(data)) {
        console.log("Данные уже являются массивом:", data);
        return data;
      } else {
        console.log("Неожиданная структура данных, возвращаем пустой массив");
        return [];
      }
    } catch (error) {
      console.error("Ошибка получения задач:", error);
      throw error;
    }
  },

  // Получение задачи по ID
  getTask: async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Токен не найден");
      }

      const response = await fetch(`${API_BASE_URL}/kanban/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка получения задачи");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Ошибка получения задачи:", error);
      throw error;
    }
  },

  // Создание новой задачи
  createTask: async (taskData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Токен не найден");
      }

      console.log("Отправляем данные для создания задачи:", taskData);

      const response = await fetch(`${API_BASE_URL}/kanban`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });

      console.log("Статус ответа создания задачи:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Ошибка API создания задачи:", errorData);
        throw new Error(errorData.error || "Ошибка создания задачи");
      }

      const data = await response.json();
      console.log("Ответ от API создания задачи:", data);
      console.log("Тип данных:", typeof data);
      console.log("Структура данных:", JSON.stringify(data, null, 2));
      return data;
    } catch (error) {
      console.error("Ошибка создания задачи:", error);
      throw error;
    }
  },

  // Обновление задачи
  updateTask: async (id, taskData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Токен не найден");
      }

      console.log("Отправляем данные для обновления задачи:", { id, taskData });
      console.log(
        "JSON данные для отправки:",
        JSON.stringify(taskData, null, 2)
      );

      const response = await fetch(`${API_BASE_URL}/kanban/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });

      console.log("Статус ответа обновления задачи:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Ошибка API обновления задачи:", errorData);
        console.error("Статус ответа:", response.status);
        console.error("Заголовки ответа:", response.headers);
        throw new Error(
          errorData.error || `Ошибка обновления задачи (${response.status})`
        );
      }

      const data = await response.json();
      console.log("Ответ от API обновления задачи:", data);
      console.log("Тип данных:", typeof data);
      console.log("Структура данных:", JSON.stringify(data, null, 2));

      // Проверяем, что данные содержат необходимые поля
      if (!data || typeof data !== "object") {
        console.error("API вернул некорректные данные:", data);
        throw new Error("Некорректный ответ от API");
      }

      return data;
    } catch (error) {
      console.error("Ошибка обновления задачи:", error);
      throw error;
    }
  },

  // Удаление задачи
  deleteTask: async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Токен не найден");
      }

      const response = await fetch(`${API_BASE_URL}/kanban/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка удаления задачи");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Ошибка удаления задачи:", error);
      throw error;
    }
  },
};

export default api;
