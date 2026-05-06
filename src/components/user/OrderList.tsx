// src/components/user/OrderList.tsx
"use client";

import React, { useState } from "react";
import OrderTabs from "@/components/user/OrderTabs";
import OrderCard from "./OrderCard";
import { useOrders } from "@/hooks/useOrders";
import { TAB_TO_STATUS_MAP } from "@/constants";
import { PackageOpen, Loader2 } from "lucide-react";

type TabKey = "processing" | "shipping" | "delivered" | "cancelled";

const OrderList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("processing");
  
  // Ánh xạ tab hiện tại sang status Backend (VD: "processing" -> "dang_xu_ly")
  const backendStatus = TAB_TO_STATUS_MAP[activeTab];
  
  const { orders, loading, hasMore, loadMore } = useOrders(backendStatus);

  return (
    <div className="w-full flex flex-col">
      <OrderTabs active={activeTab} onChange={(key) => setActiveTab(key as TabKey)} />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-[var(--color-background)] min-h-[500px]">
        <div className="max-w-[800px] mx-auto flex flex-col gap-5">
          
          {/* Vòng lặp hiển thị Card */}
          {orders.map((order) => (
            <OrderCard key={order.orders_id} order={order} />
          ))}

          {/* Trạng thái Loading lúc đầu */}
          {loading && orders.length === 0 && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-[var(--color-primary)]" size={40} />
            </div>
          )}

          {/* Trạng thái trống (Empty State) */}
          {!loading && orders.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <PackageOpen size={80} className="text-gray-500 mb-4" strokeWidth={1} />
              <h3 className="text-xl font-semibold text-white mb-2">Chưa có đơn hàng</h3>
              <p className="text-gray-400">Bạn chưa có đơn hàng nào trong trạng thái này.</p>
            </div>
          )}

          {/* Nút Xem Thêm (Lazy Loading) */}
          {hasMore && (
            <div className="flex justify-center mt-4">
              <button
                onClick={loadMore}
                disabled={loading}
                className="px-6 py-2.5 border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : "Xem thêm đơn hàng"}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default OrderList;