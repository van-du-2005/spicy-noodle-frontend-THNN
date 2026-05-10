/* stylelint-disable selector-class-pattern */
"use client";

import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
// IMPORT thêm usePathname từ Next.js
import { usePathname } from "next/navigation"; 
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminGuard from "@/components/auth/AdminGuard";

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
  // Đọc đường dẫn URL hiện tại (ví dụ: "/admin/menu")
  const pathname = usePathname(); 

  // Tự động xác định mục đang Active dựa vào URL thay vì dùng useState
  let activeItem: AdminSectionKey = "overview"; // Mặc định
  if (pathname.includes("/admin/menu")) activeItem = "menu";
  else if (pathname.includes("/admin/orders")) activeItem = "orders";
  else if (pathname.includes("/admin/customers")) activeItem = "customers";
  else if (pathname.includes("/admin/ai")) activeItem = "ai";

  const currentSection = adminSectionMeta[activeItem];

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-background">
        <aside className="sticky top-0 h-screen shrink-0">
          <AdminSidebar
            activeItem={activeItem}
            // Không cần onItemSelect nữa vì Sidebar nên dùng thẻ <Link> để chuyển trang
            onItemSelect={() => {}} 
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
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--color-panel-elevated)",
            color: "#fff",
          },
        }}
      />
    </AdminGuard>
  );
}