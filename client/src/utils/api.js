import axios from "axios";

// Get API URL and ensure it includes /api prefix
const getAPIBaseURL = () => {
  const envURL = import.meta.env.VITE_API_URL;

  // If no environment variable, use relative /api (for development with proxy)
  if (!envURL) {
    return "/api";
  }

  // If envURL already ends with /api, use it as-is
  if (envURL.endsWith("/api")) {
    return envURL;
  }

  // Otherwise, append /api
  return `${envURL}/api`;
};

const api = axios.create({
  baseURL: getAPIBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("🔧 API Base URL configured:", getAPIBaseURL());

// Add token to requests
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
  },
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// Transaction API calls
export const transactionAPI = {
  getAll: (params) => api.get("/transactions", { params }),
  getById: (id) => api.get(`/transactions/${id}`),
  create: (data) => api.post("/transactions", data),
  update: (id, data) => api.put(`/transactions/${id}`, data),
  delete: (id) => api.delete(`/transactions/${id}`),
  getAnalytics: (params) => api.get("/transactions/analytics", { params }),
};

export default api;
