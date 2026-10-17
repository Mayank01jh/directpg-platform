import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.directpg.in/v1";

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 15000,
      headers: { "Content-Type": "application/json" },
    });

    this.client.interceptors.request.use((config) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("dpg_access_token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.client.interceptors.response.use(
      (response) => response.data,
      async (error) => {
        if (error.response?.status === 401) {
          if (typeof window !== "undefined") {
            localStorage.removeItem("dpg_access_token");
            window.location.href = "/login";
          }
        }
        return Promise.reject(error.response?.data || error);
      }
    );
  }

  get<T>(url: string, config?: AxiosRequestConfig) {
    return this.client.get<T, T>(url, config);
  }
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.client.post<T, T>(url, data, config);
  }
  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.client.put<T, T>(url, data, config);
  }
  patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.client.patch<T, T>(url, data, config);
  }
  delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.client.delete<T, T>(url, config);
  }
}

export const api = new ApiService();
