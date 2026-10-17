import { api } from "./api";
import type { User, ApiResponse } from "@/types";

export interface LoginDto { email: string; password: string }
export interface RegisterDto {
  name: string; email: string; phone: string;
  password: string; role: "tenant" | "owner";
}
export interface AuthResponse {
  user: User; accessToken: string; refreshToken: string;
}

export const authService = {
  login: (data: LoginDto) =>
    api.post<ApiResponse<AuthResponse>>("/auth/login", data),

  register: (data: RegisterDto) =>
    api.post<ApiResponse<AuthResponse>>("/auth/register", data),

  logout: () => api.post<ApiResponse<void>>("/auth/logout"),

  getMe: () => api.get<ApiResponse<User>>("/auth/me"),

  refreshToken: (refreshToken: string) =>
    api.post<ApiResponse<{ accessToken: string }>>("/auth/refresh", { refreshToken }),

  forgotPassword: (email: string) =>
    api.post<ApiResponse<void>>("/auth/forgot-password", { email }),

  resetPassword: (token: string, password: string) =>
    api.post<ApiResponse<void>>("/auth/reset-password", { token, password }),

  verifyPhone: (otp: string) =>
    api.post<ApiResponse<void>>("/auth/verify-phone", { otp }),
};
