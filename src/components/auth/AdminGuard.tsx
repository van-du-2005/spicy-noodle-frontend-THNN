// src/components/admin/AdminGuard.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth/AuthContext";
import { USER_ROLE } from "@/constants"; 

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Nếu đã tải xong dữ liệu user mà phát hiện sự bất thường
    if (!loading) {
      // Nếu chưa đăng nhập HOẶC đã đăng nhập nhưng không phải admin
      if (!user || user.role !== USER_ROLE.ADMIN) {
        router.replace("/"); // "Đá" người dùng về trang chủ ngay lập tức
      }
    }
  }, [user, loading, router]);

  // Trong lúc chờ tải dữ liệu từ Backend, hiện thông báo tải
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <span className="text-primary font-medium">Đang kiểm tra quyền truy cập...</span>
      </div>
    );
  }

  // Nếu không phải admin, không render gì cả (để chờ lệnh đá về trang chủ chạy)
  if (!user || user.role !== USER_ROLE.ADMIN) {
    return null; 
  }

  // Nếu qua được mọi vòng kiểm tra (đúng là Admin), thì hiển thị giao diện Admin
  return <>{children}</>;
}