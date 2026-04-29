// src/app/layout.tsx

import type { ReactNode } from "react";
import "./globals.css";
import { AuthProvider } from "@/context/auth/AuthContext";

export const metadata = {
  title: "Mì Cay Store - Đặt hàng trực tuyến",
  description: "Hệ thống đặt hàng mì cay nhanh chóng và tiện lợi",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
