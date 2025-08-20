import axios from "axios";

// Базовый URL API
const API_BASE_URL = "https://wedev-api.sky.pro/api/kanban";

// Создаем экземпляр axios с базовой конфигурацией
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Интерцептор для добавления токена к запросам
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

// Интерцептор для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Если токен истек, очищаем localStorage и перенаправляем на логин
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// API для авторизации
export const authAPI = {
  // Регистрация
  register: async (userData) => {
    const response = await api.post("/register", userData);
    return response.data;
  },

  // Вход
  login: async (credentials) => {
    const response = await api.post("/login", credentials);
    return response.data;
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
