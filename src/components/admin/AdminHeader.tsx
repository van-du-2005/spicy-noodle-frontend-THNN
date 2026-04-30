/* stylelint-disable selector-class-pattern */
"use client";

import type { ReactNode } from "react";
import { Bell } from "lucide-react";

type AdminHeaderProps = {
  title?: string;
  description?: string;
  userName?: string;
  userRole?: string;
  notificationDot?: boolean;
  avatar?: ReactNode;
};

export default function AdminHeader({
  title = "Tổng quan",
  description = "Xem tổng quan doanh thu và đơn hàng hôm nay",
  userName = "Admin",
  userRole = "Quản trị viên",
  notificationDot = true,
  avatar,
}: AdminHeaderProps) {
  return (
    <header className="border-b border-border bg-surface/95 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-6 px-5 py-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>
          <p className="mt-1 truncate text-sm text-foreground/65 sm:text-base">
            {description}
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
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary to-primary-2 text-sm font-bold text-white">
              {avatar ?? "A"}
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
