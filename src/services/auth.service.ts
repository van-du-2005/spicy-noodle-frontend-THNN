// src/services/auth.service.ts

import axios from "axios";
import { API_URL } from "@/config/api.config";

export const authService = {
  // Lấy thông tin user hiện tại
  getMe: async () => {
    const response = await axios.get(`${API_URL}/api/auth/me`, {
      withCredentials: true,
    });
    return response.data;
  },

  // Đường dẫn đăng nhập Google
  getGoogleLoginUrl: () => `${API_URL}/api/auth/google`,

  // Đường dẫn đăng xuất
  logout: async () => {
    const response = await axios.post(
      `${API_URL}/api/auth/logout`,
      {},
      {
        withCredentials: true, // Quan trọng để Backend xóa được Cookie
      },
    );
    return response.data;
  },
};
