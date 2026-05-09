// src/services/ai-admin.service.ts
import axios from "axios";
import { API_URL } from "@/config/api.config";

interface GetSystemPromptResponse {
  success: boolean;
  data: {
    prompt: string;
  };
}

interface UpdateSystemPromptResponse {
  success: boolean;
  message: string;
}

interface RebuildVectorDBResponse {
  success: boolean;
  message: string;
}

export const aiAdminService = {
  async rebuildVectorDB(): Promise<RebuildVectorDBResponse> {
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/ai/reingest`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw {
          message: error.response?.data?.message || "Lỗi rebuild vector database",
          status: error.response?.status,
        };
      }
      throw error;
    }
  },

  async getSystemPrompt(): Promise<GetSystemPromptResponse> {
    try {
      const response = await axios.get(`${API_URL}/api/admin/ai/system-prompt`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw {
          message: error.response?.data?.message || "Lỗi lấy system prompt",
          status: error.response?.status,
        };
      }
      throw error;
    }
  },

  async updateSystemPrompt(prompt: string): Promise<UpdateSystemPromptResponse> {
    try {
      const response = await axios.put(
        `${API_URL}/api/admin/ai/system-prompt`,
        { prompt },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw {
          message: error.response?.data?.message || "Lỗi cập nhật system prompt",
          status: error.response?.status,
        };
      }
      throw error;
    }
  },
};
