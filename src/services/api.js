import axios from "axios";

// Базовый URL API
const API_BASE_URL = "https://wedev-api.sky.pro/api";

// Создаем экземпляр axios для аутентификации (без заголовков)
// const authApi = axios.create({
//   baseURL: API_BASE_URL,
// });

// Создаем экземпляр axios с базовой конфигурацией для защищенных запросов
const api = axios.create({
  baseURL: "https://wedev-api.sky.pro/api/kanban",
  headers: {
    "Content-Type": "",
  },
});

// Интерцептор для добавления токена к защищенным запросам
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Пробуем разные форматы заголовка авторизации
      config.headers.Authorization = `Bearer ${token}`;
      // config.headers["X-Auth-Token"] = token;
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

      // Отправляем JSON данные без Content-Type заголовка
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

      // Отправляем JSON данные без Content-Type заголовка
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

  // Получение профиля пользователя
  getProfile: async () => {
    try {
      const userData = localStorage.getItem("userData");
      if (!userData) {
        throw new Error("Данные пользователя не найдены");
      }
      const user = JSON.parse(userData);
      const userId = user._id;

      const response = await fetch(`${API_BASE_URL}/kanban/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка получения профиля");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Ошибка получения профиля:", error);
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
      const userData = localStorage.getItem("userData");
      console.log("Данные пользователя из localStorage:", userData);

      if (!userData) {
        throw new Error("Данные пользователя не найдены");
      }
      const user = JSON.parse(userData);
      const userId = user._id;
      console.log("ID пользователя:", userId);

      console.log("Отправляем запрос с ID пользователя:", userId);
      console.log("Заголовки запроса:", {
        Authorization: `Bearer ${userId}`,
      });

      const response = await fetch(
        "https://wedev-api.sky.pro/api/kanban/tasks",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userId}`,
          },
        }
      );

      console.log("Статус ответа задач:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Ошибка API задач:", errorData);
        throw new Error(errorData.error || "Ошибка получения задач");
      }

      const data = await response.json();
      console.log("Ответ от API задач:", data);
      return data;
    } catch (error) {
      console.error("Ошибка получения задач:", error);
      throw error;
    }
  },

  // Получение задачи по ID
  getTask: async (id) => {
    try {
      const userData = localStorage.getItem("userData");
      if (!userData) {
        throw new Error("Данные пользователя не найдены");
      }
      const user = JSON.parse(userData);
      const userId = user._id;

      const response = await fetch(`${API_BASE_URL}/kanban/tasks/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userId}`,
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
      const userData = localStorage.getItem("userData");
      if (!userData) {
        throw new Error("Данные пользователя не найдены");
      }
      const user = JSON.parse(userData);
      const userId = user._id;

      const response = await fetch(`${API_BASE_URL}/kanban/tasks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userId}`,
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка создания задачи");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Ошибка создания задачи:", error);
      throw error;
    }
  },

  // Обновление задачи
  updateTask: async (id, taskData) => {
    try {
      const userData = localStorage.getItem("userData");
      if (!userData) {
        throw new Error("Данные пользователя не найдены");
      }
      const user = JSON.parse(userData);
      const userId = user._id;

      const response = await fetch(`${API_BASE_URL}/kanban/tasks/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userId}`,
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка обновления задачи");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Ошибка обновления задачи:", error);
      throw error;
    }
  },

  // Удаление задачи
  deleteTask: async (id) => {
    try {
      const userData = localStorage.getItem("userData");
      if (!userData) {
        throw new Error("Данные пользователя не найдены");
      }
      const user = JSON.parse(userData);
      const userId = user._id;

      const response = await fetch(`${API_BASE_URL}/kanban/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userId}`,
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
