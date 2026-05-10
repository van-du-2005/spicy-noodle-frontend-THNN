// src/hooks/useDashboardData.ts
import { useState, useEffect } from "react";
import { reportService } from "@/services/report.service";
import { IOverviewData, ITopProduct } from "@/types/report.type";

export const useDashboardData = () => {
  const [overview, setOverview] = useState<IOverviewData | null>(null);
  const [topProducts, setTopProducts] = useState<ITopProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchAll = async () => {
      try {
        setLoading(true);
        // Gọi song song 2 API để tối ưu tốc độ
        const [overviewRes, topProductsRes] = await Promise.all([
          reportService.getOverview(),
          reportService.getTopProducts(5)
        ]);

        if (isMounted) {
          if (overviewRes.success) setOverview(overviewRes.data);
          if (topProductsRes.success) setTopProducts(topProductsRes.data);
        }
      } catch (err: unknown) {
        if (isMounted) setError("Lỗi khi tải dữ liệu tổng quan. Vui lòng thử lại.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAll();
    return () => { isMounted = false; };
  }, []);

  return { overview, topProducts, loading, error };
};