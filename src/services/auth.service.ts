// src/services/auth.service.ts

import axios from "axios";
import { API_URL } from "@/config/api.config";

export const authService = {
  // Lấy thông tin user hiện tại
  getMe: async () => {
    const response = await axios.get(`${API_URL}/auth/me`, {
      withCredentials: true,
    });
    return response.data;
  },

  // Đường dẫn đăng nhập Google
  getGoogleLoginUrl: () => `${API_URL}/auth/google`,

  // Đường dẫn đăng xuất
  getLogoutUrl: () => `${API_URL}/auth/logout`
};