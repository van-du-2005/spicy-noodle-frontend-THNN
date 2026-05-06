// src/hooks/useOrderDetail.ts
import { useState, useEffect } from "react";
import { orderService } from "@/services/order.service";
import { IOrderDetailResponse } from "@/types/order.type";

export const useOrderDetail = (orderId: string | number) => {
  const [order, setOrder] = useState<IOrderDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return;
    let isMounted = true;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await orderService.getOrderDetails(orderId);
        if (res.success && isMounted) {
          setOrder(res.data);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.response?.data?.message || "Có lỗi xảy ra khi tải chi tiết đơn hàng.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDetail();
    return () => { isMounted = false; };
  }, [orderId]);

  return { order, loading, error };
};