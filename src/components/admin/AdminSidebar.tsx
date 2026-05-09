// src/components/admin/AdminSidebar.tsx

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/svg/Logo";
import {
  LayoutGrid,
  UtensilsCrossed,
  ShoppingCart,
  Users,
  Bot,
  ExternalLink,
  Menu,
  LogOut,
} from "lucide-react";

import { useAuth } from "@/context/auth/AuthContext";
import { authService } from "@/services/auth.service";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
}

type AdminSidebarProps = {
  activeItem: string;
  onItemSelect: (itemId: string) => void;
};

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeItem,
  onItemSelect,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  // xử lý logout
  const { setUser } = useAuth();
  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    }
  };

  const mainNavItems: NavItem[] = [
    {
      id: "overview",
      label: "Tổng quan",
      icon: <LayoutGrid className="w-5 h-5" />,
      href: "/admin/dashboard",
    },
    {
      id: "menu",
      label: "Quản lý Menu",
      icon: <UtensilsCrossed className="w-5 h-5" />,
      href: "/admin",
    },
    {
      id: "orders",
      label: "Quản lý Đơn hàng",
      icon: <ShoppingCart className="w-5 h-5" />,
      href: "/admin",
      badge: 3,
    },
    {
      id: "customers",
      label: "Quản lý Khách hàng",
      icon: <Users className="w-5 h-5" />,
      href: "/admin",
    },
    {
      id: "ai",
      label: "Cấu hình AI",
      icon: <Bot className="w-5 h-5" />,
      href: "/admin/ai",
    },
  ];

  const handleNavItemClick = (itemId: string, href: string) => {
    onItemSelect(itemId);
    router.push(href); // Chuyển phần Body sang trang tương ứng
  };

  return (
    <aside
      className={`
        flex h-screen flex-col
        overflow-hidden
        border-r border-gray-800
        bg-gray-950
        transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-20" : "w-64"}
      `}
    >
      {/* Header - Logo and Brand */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          {/* Logo Container */}
          <div className="shrink-0 rounded-lg flex items-center justify-center">
            <Logo className="w-12 h-auto" />
          </div>

          {/* Brand Name and Subtitle */}
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <h1 className="text-sm font-bold text-white truncate">
                Mì Cay Đỉnh
              </h1>
              <p className="text-xs text-gray-400 truncate">Admin Panel</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-6 overflow-y-auto">
        <div className="space-y-2">
          {mainNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavItemClick(item.id, item.href)}
              className={`
                  w-full flex items-center justify-between
                  px-4 py-3 rounded-lg
                  transition-all duration-200
                  group relative
                  cursor-pointer
                  ${
                    activeItem === item.id
                      ? "bg-linear-to-r from-orange-500 to-red-600 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-800"
                  }
                `}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`
                      shrink-0
                      ${activeItem === item.id ? "text-white" : "text-gray-400 group-hover:text-gray-200"}
                    `}
                >
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="text-sm font-medium truncate">
                    {item.label}
                  </span>
                )}
              </div>

              {/* Notification Badge */}
              {item.badge && (
                <span
                  className={`
                      shrink-0 w-6 h-6 rounded-full
                      flex items-center justify-center
                      text-xs font-bold
                      ${
                        activeItem === item.id
                          ? "bg-white text-red-600"
                          : "bg-red-600 text-white"
                      }
                    `}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Divider */}
      <div className="px-3 py-2">
        <div className="h-px bg-gray-800"></div>
      </div>

      {/* Footer Navigation */}
      <div className="px-3 py-4 space-y-2">
        {/* View Customer Page */}
        {/* <button
          className={`
              w-full flex items-center gap-3
              px-4 py-3 rounded-lg
              text-gray-400 hover:text-gray-200
              transition-colors duration-200
            `}
        >
          <ExternalLink className="h-5 w-5 shrink-0" />
          {!isCollapsed && (
            <span className="text-sm truncate">Xem trang khách hàng</span>
          )}
        </button> */}

        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`
              w-full flex items-center gap-3
              px-4 py-3 rounded-lg
              text-gray-400 hover:text-gray-200
              transition-colors duration-200
              cursor-pointer
            `}
        >
          <Menu className="h-5 w-5 shrink-0" />
          {!isCollapsed && <span className="text-sm truncate">Thu gọn</span>}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`
              w-full flex items-center gap-3
              px-4 py-3 rounded-lg
              bg-gray-800 hover:bg-gray-700
              text-red-500 hover:text-red-400
              transition-all duration-200
              cursor-pointer
            `}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!isCollapsed && (
            <span className="text-sm font-medium truncate">Đăng xuất</span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
