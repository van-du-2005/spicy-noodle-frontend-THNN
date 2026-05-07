// src/hooks/useLowStock.ts
import { useState, useEffect, useCallback } from "react";
import { reportService } from "@/services/report.service";
import { ILowStockItem } from "@/types/report.type";

export const useLowStock = () => {
  const [items, setItems] = useState<ILowStockItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchLowStock = useCallback(async (currentPage: number) => {
    try {
      setLoading(true);
      const res = await reportService.getLowStock(currentPage, 15);
      if (res.success) {
        setItems(prev => currentPage === 1 ? res.data.items : [...prev, ...res.data.items]);
        setHasMore(res.data.has_more);
      }
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm cảnh báo:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLowStock(1);
  }, [fetchLowStock]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchLowStock(nextPage);
    }
  };

  return { items, loading, hasMore, loadMore };
};