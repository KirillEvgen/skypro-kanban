import axios from "axios";

const API_BASE_URL = "https://wedev-api.sky.pro/api";

const api = axios.create({
  baseURL: `${API_BASE_URL}/kanban`,
  headers: {
    "Content-Type": "application/json",
  },
});

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: async (userData) => {
    try {
      const requestData = {
        login: userData.email,
        name: userData.name,
        password: userData.password,
      };

      const response = await fetch(`${API_BASE_URL}/user`, {
        method: "POST",
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка регистрации");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Ошибка регистрации:", error);
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const requestData = {
        login: credentials.email,
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
      return data;
    } catch (error) {
      console.error("Ошибка входа:", error);
      throw error;
    }
  },
};

export const tasksAPI = {
  getTasks: async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Токен не найден");
      }

      const response = await fetch(`${API_BASE_URL}/kanban`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка получения задач");
      }

      const data = await response.json();

      if (data && data.tasks && Array.isArray(data.tasks)) {
        return data;
      } else if (Array.isArray(data)) {
        return { tasks: data };
      } else {
        return { tasks: [] };
      }
    } catch (error) {
      console.error("Ошибка получения задач:", error);

      // Обработка различных типов ошибок
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        throw new Error("Ошибка сети. Проверьте подключение к интернету.");
      } else if (error.response?.status === 500) {
        throw new Error("Ошибка сервера. Попробуйте позже.");
      } else if (error.response?.status === 503) {
        throw new Error("Сервер временно недоступен. Попробуйте позже.");
      } else if (error.response?.status >= 500) {
        throw new Error("Внутренняя ошибка сервера. Попробуйте позже.");
      }

      throw error;
    }
  },

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

      if (!data || typeof data !== "object") {
        throw new Error("Некорректный ответ от API");
      }

      return data;
    } catch (error) {
      console.error("Ошибка получения задачи:", error);
      throw error;
    }
  },

  createTask: async (taskData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Токен не найден");
      }

      const response = await fetch(`${API_BASE_URL}/kanban`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка создания задачи");
      }

      const data = await response.json();

      if (!data || typeof data !== "object") {
        throw new Error("Некорректный ответ от API");
      }

      if (data.tasks && Array.isArray(data.tasks)) {
        const createdTask = data.tasks.find(
          (task) =>
            task.title === taskData.title &&
            task.description === taskData.description
        );

        if (createdTask) {
          return createdTask;
        } else {
          throw new Error("API не вернул созданную задачу");
        }
      }

      if (!data._id && !data.id) {
        throw new Error("API не вернул ID задачи");
      }

      return data;
    } catch (error) {
      console.error("Ошибка создания задачи:", error);

      // Обработка различных типов ошибок
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        throw new Error("Ошибка сети. Проверьте подключение к интернету.");
      } else if (error.response?.status === 500) {
        throw new Error("Ошибка сервера. Попробуйте позже.");
      } else if (error.response?.status === 503) {
        throw new Error("Сервер временно недоступен. Попробуйте позже.");
      } else if (error.response?.status >= 500) {
        throw new Error("Внутренняя ошибка сервера. Попробуйте позже.");
      }

      throw error;
    }
  },

  updateTask: async (id, taskData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Токен не найден");
      }

      const response = await fetch(`${API_BASE_URL}/kanban/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Ошибка обновления задачи (${response.status})`
        );
      }

      const data = await response.json();

      if (!data || typeof data !== "object") {
        throw new Error("Некорректный ответ от API");
      }

      if (data.tasks && Array.isArray(data.tasks)) {
        const updatedTask = data.tasks.find(
          (task) => (task._id || task.id) === id
        );

        if (updatedTask) {
          return updatedTask;
        } else {
          throw new Error("API не вернул обновленную задачу");
        }
      }

      if (!data._id && !data.id) {
        throw new Error("API не вернул ID задачи");
      }

      return data;
    } catch (error) {
      console.error("Ошибка обновления задачи:", error);

      // Обработка различных типов ошибок
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        throw new Error("Ошибка сети. Проверьте подключение к интернету.");
      } else if (error.response?.status === 500) {
        throw new Error("Ошибка сервера. Попробуйте позже.");
      } else if (error.response?.status === 503) {
        throw new Error("Сервер временно недоступен. Попробуйте позже.");
      } else if (error.response?.status >= 500) {
        throw new Error("Внутренняя ошибка сервера. Попробуйте позже.");
      }

      throw error;
    }
  },

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

      if (!data || typeof data !== "object") {
        throw new Error("Некорректный ответ от API");
      }

      return data;
    } catch (error) {
      console.error("Ошибка удаления задачи:", error);

      // Обработка различных типов ошибок
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        throw new Error("Ошибка сети. Проверьте подключение к интернету.");
      } else if (error.response?.status === 500) {
        throw new Error("Ошибка сервера. Попробуйте позже.");
      } else if (error.response?.status === 503) {
        throw new Error("Сервер временно недоступен. Попробуйте позже.");
      } else if (error.response?.status >= 500) {
        throw new Error("Внутренняя ошибка сервера. Попробуйте позже.");
      }

      throw error;
    }
  },
};

export default api;
