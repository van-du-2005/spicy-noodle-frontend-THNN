/* stylelint-disable selector-class-pattern */
"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { useAuth } from "@/context/auth/AuthContext";
import { Bell } from "lucide-react";
import { USER_ROLE } from "@/constants";
import { usePathname } from "next/navigation";

type AdminHeaderProps = {
  title?: string;
  description?: string;
  notificationDot?: boolean;
};

export default function AdminHeader({
  title = "Tổng quan",
  description = "Xem tổng quan doanh thu và đơn hàng hôm nay",
  notificationDot = true,
}: AdminHeaderProps) {
  const { user } = useAuth();
  // Gọi hàm lấy URL hiện tại
  const pathname = usePathname();

  // 👇 KHỐI LOGIC TỰ ĐỘNG ĐỔI TÊN THEO URL 👇
  let displayTitle = title;
  let displayDesc = description;

  if (pathname.includes("/admin/orders")) {
    displayTitle = "Quản lý Đơn hàng";
    displayDesc = "Theo dõi và cập nhật trạng thái đơn hàng";
  } else if (pathname.includes("/admin/customers")) {
    displayTitle = "Quản lý Khách hàng";
    displayDesc = "Xem thông tin, hoạt động và lịch sử mua hàng của khách";
  } else if (pathname.includes("/admin/menu")) {
    displayTitle = "Quản lý Menu";
    displayDesc = "Quản lý danh mục món ăn, topping và combo trên hệ thống";
  } else if (pathname.includes("/admin/dashboard") || pathname === "/admin") {
    displayTitle = "Tổng quan";
    displayDesc = "Xem tổng quan doanh thu và đơn hàng hôm nay";
  }
  // Xử lý dữ liệu hiển thị (Fallback nếu đang tải hoặc lỗi)
  const userName = user?.name || "Đang tải...";
  const userRole =
    user?.role === USER_ROLE.ADMIN ? "Quản trị viên" : "Nhân viên";

  // Lấy chữ cái đầu tiên của tên để làm Avatar mặc định (Ví dụ: "Nguyễn Văn A" -> "N")
  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "A";

  return (
    <header className="border-b border-border bg-surface/95 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-6 px-5 py-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {displayTitle}
          </h1>
          <p className="mt-1 truncate text-sm text-foreground/65 sm:text-base">
            {displayDesc}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <button
            type="button"
            aria-label="Thông báo"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-panel-elevated-border bg-panel-elevated text-foreground transition-all duration-200 hover:border-primary/60 hover:bg-panel-elevated-hover hover:-translate-y-px"
          >
            <Bell className="h-5 w-5" />
            {notificationDot ? (
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-panel-elevated" />
            ) : null}
          </button>

          <div className="h-10 w-px bg-border" aria-hidden="true" />

          <div className="flex items-center gap-3 rounded-2xl border border-panel-elevated-border bg-panel-elevated px-3 py-2.5 shadow-[0_12px_32px_var(--panel-shadow)]">
            <div className="relative flex h-11 w-11 shrink-0 overflow-hidden items-center justify-center rounded-full bg-linear-to-br from-primary to-primary-2 text-sm font-bold text-white">
              {user?.avatar_url ? (
                <Image
                  src={user?.avatar_url}
                  alt={userName}
                  referrerPolicy="no-referrer"
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              ) : (
                firstLetter
              )}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground sm:text-base">
                {userName}
              </p>
              <p className="truncate text-xs text-foreground/60 sm:text-sm">
                {userRole}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
