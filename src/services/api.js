import axios from "axios";

// Базовый URL API
const API_BASE_URL = "https://wedev-api.sky.pro/api/kanban";

// Создаем экземпляр axios для аутентификации (без заголовков)
const authApi = axios.create({
  baseURL: API_BASE_URL,
});

// Создаем экземпляр axios с базовой конфигурацией для защищенных запросов
const api = axios.create({
  baseURL: API_BASE_URL,
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

      // Отправляем данные как FormData (без Content-Type заголовка)
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      // Попробуем добавить дополнительные поля, которые могут потребоваться
      formData.append("confirmPassword", userData.password);

      console.log("FormData содержимое:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await authApi.post("/register", formData);
      console.log("Успешная регистрация:", response.data);
      return response.data;
    } catch (error) {
      console.error("Ошибка регистрации:", error);
      console.error("Статус:", error.response?.status);
      console.error("Данные ответа:", error.response?.data);
      console.error("Заголовки ответа:", error.response?.headers);
      throw error;
    }
  },

  // Вход
  login: async (credentials) => {
    try {
      console.log("Отправляем данные для входа:", credentials);

      // Отправляем данные как FormData (без Content-Type заголовка)
      const formData = new FormData();
      formData.append("email", credentials.email);
      formData.append("password", credentials.password);

      const response = await authApi.post("/login", formData);
      console.log("Успешный вход:", response.data);
      return response.data;
    } catch (error) {
      console.error("Ошибка входа:", error);
      console.error("Статус:", error.response?.status);
      console.error("Данные ответа:", error.response?.data);
      console.error("Заголовки ответа:", error.response?.headers);
      throw error;
    }
  },

  // Получение профиля пользователя
  getProfile: async () => {
    const response = await api.get("/profile");
    return response.data;
  },
};

// API для задач
export const tasksAPI = {
  // Получение всех задач
  getTasks: async () => {
    const response = await api.get("/tasks");
    return response.data;
  },

  // Получение задачи по ID
  getTask: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  // Создание новой задачи
  createTask: async (taskData) => {
    const response = await api.post("/tasks", taskData);
    return response.data;
  },

  // Обновление задачи
  updateTask: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  // Удаление задачи
  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};

export default api;
