import axios, { InternalAxiosRequestConfig } from "axios";
import { toast } from "react-hot-toast";
import i18n from "../i18n";

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
    const isAuthRoute =
      error.config?.url?.includes("/login") ||
      error.config?.url?.includes("/register");

    if (error.response && error.response.status === 401 && !isAuthRoute) {
      window.localStorage.removeItem("session");
      toast.error(i18n.t("notifications.session_expired"));
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
