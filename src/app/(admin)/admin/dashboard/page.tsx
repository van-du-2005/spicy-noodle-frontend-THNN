// src/app/(admin)/admin/dashboard/page.tsx
"use client";

import React from "react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useLowStock } from "@/hooks/useLowStock";
import { Loader2 } from "lucide-react";

import { RevenueCards } from "@/components/admin/dashboard/RevenueCards";
import { OrderOverview } from "@/components/admin/dashboard/OrderOverview";
import { TopSellingProducts } from "@/components/admin/dashboard/TopSellingProducts";
import { LowStockWarning } from "@/components/admin/dashboard/LowStockWarning";

export default function DashboardPage() {
  const { overview, topProducts, loading: loadingDashboard, error } = useDashboardData();
  const { items: lowStockItems, loading: loadingLowStock, hasMore, loadMore } = useLowStock();

  if (loadingDashboard) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-[var(--color-primary)]" size={48} />
        <p className="text-gray-400 font-medium">Đang tải dữ liệu thống kê...</p>
      </div>
    );
  }

  if (error || !overview) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl text-center text-red-500">
        {error || "Không thể tải dữ liệu."}
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 pb-10">
      {/* Hàng 1: Doanh thu (Chiếm ngang toàn màn hình) */}
      <RevenueCards revenue={overview.revenue} />

      {/* Hàng 2: Grid 2 cột cho Đơn hàng & Top SP */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cột 1: Trạng thái đơn hàng */}
        <OrderOverview orderCounts={overview.order_counts} />
        
        {/* Cột 2: Top sản phẩm bán chạy */}
        <TopSellingProducts products={topProducts} />
      </div>

      {/* Hàng 3: Cảnh báo hết hàng (Chiếm ngang toàn màn hình) */}
      <LowStockWarning 
        items={lowStockItems} 
        loading={loadingLowStock} 
        hasMore={hasMore} 
        onLoadMore={loadMore} 
      />
    </div>
  );
}