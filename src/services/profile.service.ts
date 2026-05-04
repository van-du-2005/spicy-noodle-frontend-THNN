// src/services/profile.service.ts
import axios from "axios";
import { API_URL } from "@/config/api.config"; 

export const profileService = {
  // Lấy thông tin
  getProfile: async () => {
    const response = await axios.get(`${API_URL}/users/profile`, {
      withCredentials: true, 
    });
    return response.data;
  },

  // Cập nhật thông tin
  updateProfile: async (data: { name: string; phone: string; birthDate: string }) => {
    const response = await axios.put(`${API_URL}/users/profile`, data, {
      withCredentials: true,
    });
    return response.data;
  },
};