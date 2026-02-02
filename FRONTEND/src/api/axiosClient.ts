import axios, { InternalAxiosRequestConfig } from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const sessionStr = window.localStorage.getItem("session");
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        if (session && session.token) {
          if (!config.headers) {
            config.headers = new axios.AxiosHeaders();
          }
          config.headers.set("Authorization", `Bearer ${session.token}`);
        }
      } catch (e) {
        console.error("Error parsing session", e);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosClient;
