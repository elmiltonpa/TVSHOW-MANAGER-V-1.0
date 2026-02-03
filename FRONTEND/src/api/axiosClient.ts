import axios, { InternalAxiosRequestConfig } from "axios";
import { toast } from "react-hot-toast";

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

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Don't redirect on 401 for login/register routes - those are expected auth failures
    const isAuthRoute = error.config?.url?.includes("/login") || error.config?.url?.includes("/register");
    
    if (error.response && error.response.status === 401 && !isAuthRoute) {
      window.localStorage.removeItem("session");
      toast.error("Session expired, please login again");
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);

export default axiosClient;