import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const sessionStr = window.localStorage.getItem("session");
    if (sessionStr) {
      const session = JSON.parse(sessionStr);
      if (session && session.token) {
        config.headers.Authorization = `Bearer ${session.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosClient;
