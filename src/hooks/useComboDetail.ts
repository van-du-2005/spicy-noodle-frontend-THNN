import { useState, useEffect } from "react";
import { orderService } from "@/services/order.service";
import { IComboDetailResponse } from "@/types/order.type";

export const useComboDetail = (orderId: number | null, itemId: number | null) => {
  const [data, setData] = useState<IComboDetailResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Chỉ gọi API khi có đủ orderId và itemId (khi Modal được mở)
    if (!orderId || !itemId) return;

    let isMounted = true;
    const fetchCombo = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await orderService.getComboItemDetails(orderId, itemId);
        if (res.success && isMounted) {
          setData(res.data);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError("Không thể tải chi tiết combo. Vui lòng thử lại.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCombo();

    // Dọn dẹp data cũ khi đóng modal
    return () => {
      isMounted = false;
      setData(null); 
    };
  }, [orderId, itemId]);

  return { data, loading, error };
};