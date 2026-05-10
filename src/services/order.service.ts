// src/services/order.service.ts
import axios from "axios";
import { API_URL } from "@/config/api.config";
import {
  IOrderSummary,
  IOrderDetailResponse,
  IComboDetailResponse,
} from "@/types/order.type";

type GetOrdersResponse = {
  success: boolean;
  data: {
    total_count: number;
    current_page: number;
    orders: IOrderSummary[];
  };
};

export const orderService = {
  // Gọi API cập nhật trạng thái đơn hàng
  async updateOrderStatus(
    orderId: string | number,
    status: string,
  ): Promise<any> {
    const response = await axios.put(
      `${API_URL}/api/orders/${orderId}/status`,
      { order_status: status },
      { withCredentials: true },
    );
    return response.data;
  },
  async createOrder(orderData: any): Promise<any> {
    const response = await axios.post(`${API_URL}/api/orders`, orderData, {
      withCredentials: true,
    });
    return response.data;
  },
  async getOrdersHistory(params: {
    status?: string;
    page: number;
    limit: number;
  }): Promise<GetOrdersResponse> {
    const response = await axios.get(`${API_URL}/api/orders`, {
      params: {
        status: params.status,
        page: params.page,
        limit: params.limit,
      },

      withCredentials: true,
    });

    return response.data;
  },

  async getAllOrdersForAdmin(params?: any): Promise<any> {
    const response = await axios.get(`${API_URL}/api/orders/admin/all`, {
      params: {
        status: params?.status,
        page: params?.page,
        limit: params?.limit,
      },
      withCredentials: true,
    });
    return response.data;
  },
  async getOrderDetails(
    orderId: string | number,
  ): Promise<{ success: boolean; data: IOrderDetailResponse }> {
    const response = await axios.get(`${API_URL}/api/orders/${orderId}`, {
      withCredentials: true,
    });
    return response.data;
  },

  // Gọi API lấy chi tiết Combo
  async getComboItemDetails(
    orderId: string | number,
    orderItemsId: string | number,
  ): Promise<{ success: boolean; data: IComboDetailResponse }> {
    const response = await axios.get(
      `${API_URL}/api/orders/${orderId}/combo-items/${orderItemsId}`,
      { withCredentials: true },
    );
    return response.data;
  },
};
