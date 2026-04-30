/* stylelint-disable selector-class-pattern */
"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

type AdminSectionKey = "overview" | "menu" | "orders" | "customers" | "ai";

const adminSectionMeta: Record<
  AdminSectionKey,
  { title: string; description: string }
> = {
  overview: {
    title: "Tổng quan",
    description: "Xem tổng quan doanh thu và đơn hàng hôm nay",
  },
  menu: {
    title: "Quản lý Menu",
    description: "Quản lý danh mục món ăn, topping và combo trên hệ thống",
  },
  orders: {
    title: "Quản lý Đơn hàng",
    description: "Theo dõi trạng thái xử lý, giao hàng và lịch sử đơn hàng",
  },
  customers: {
    title: "Quản lý Khách hàng",
    description: "Xem thông tin, hoạt động và lịch sử mua hàng của khách",
  },
  ai: {
    title: "Cấu hình AI",
    description: "Thiết lập trợ lý AI, prompt và quy tắc trả lời tự động",
  },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [activeItem, setActiveItem] = useState<AdminSectionKey>("overview");

  const currentSection = adminSectionMeta[activeItem];

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 h-screen shrink-0">
        <AdminSidebar
          activeItem={activeItem}
          onItemSelect={(itemId) => setActiveItem(itemId as AdminSectionKey)}
        />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader
          title={currentSection.title}
          description={currentSection.description}
        />
        <main className="min-w-0 flex-1 bg-background p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
