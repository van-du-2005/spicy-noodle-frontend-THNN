// src/hooks/useOrders.ts
import { useState, useEffect, useCallback } from "react";
import { orderService } from "@/services/order.service";
import { IOrderSummary } from "@/types/order.type";

export const useOrders = (status?: string) => {
  const [orders, setOrders] = useState<IOrderSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const fetchOrders = useCallback(async (currentPage: number, currentStatus?: string) => {
    try {
      setLoading(true);
      const res = await orderService.getOrdersHistory({
        status: currentStatus,
        page: currentPage,
        limit: 5, // Mỗi lần tải 5 đơn hàng để load kiểu lazy loading
      });

      if (res.success) {
        const newOrders = res.data.orders;
        
        // Nếu là trang 1 (vừa đổi tab), reset lại mảng. Nếu > 1, nối mảng cũ với mới.
        setOrders(prev => currentPage === 1 ? newOrders : [...prev, ...newOrders]);
        
        // Kiểm tra xem tổng số đơn đã tải có nhỏ hơn tổng đơn trên DB không
        const currentTotalLoaded = (currentPage - 1) * 5 + newOrders.length;
        setHasMore(currentTotalLoaded < res.data.total_count);
      }
    } catch (error) {
      console.error("Lỗi fetch đơn hàng:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Gọi API mỗi khi biến status (Tab) thay đổi
  useEffect(() => {
    setPage(1); 
    fetchOrders(1, status);
  }, [status, fetchOrders]);

  const loadMore = () => {
    if (!hasMore || loading) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchOrders(nextPage, status);
  };

  return { orders, loading, hasMore, loadMore };
};