import axios from "axios";
import { getAccessToken, removeAccessToken } from "@/utils/auth";

export const baseUrl = import.meta.env.VITE_BASE_URL;

export const http = axios.create({
  baseURL: baseUrl,
  timeout: 60000,
});

http.defaults.headers.common["Content-Type"] = "application/json";

http.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const httpUpload = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

httpUpload.defaults.headers.common["Content-Type"] = "multipart/form-data";

httpUpload.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

httpUpload.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      removeAccessToken();
      globalThis.location.href = "/auth/login";
    }

    return Promise.reject(error);
  },
);
