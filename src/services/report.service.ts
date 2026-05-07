// src/services/report.service.ts
import axios from "axios";
import { API_URL } from "@/config/api.config";
import { IOverviewData, ITopProduct, ILowStockResponse } from "@/types/report.type";

export const reportService = {
  getOverview: async (): Promise<{ success: boolean; data: IOverviewData }> => {
    const res = await axios.get(`${API_URL}/api/reports/overview`, { withCredentials: true });
    return res.data;
  },

  getTopProducts: async (limit: number = 5): Promise<{ success: boolean; data: ITopProduct[] }> => {
    const res = await axios.get(`${API_URL}/api/reports/top-products`, { 
      params: { limit },
      withCredentials: true 
    });
    return res.data;
  },

  getLowStock: async (page: number = 1, limit: number = 15): Promise<{ success: boolean; data: ILowStockResponse }> => {
    const res = await axios.get(`${API_URL}/api/reports/low-stock`, {
      params: { page, limit },
      withCredentials: true
    });
    return res.data;
  }
};