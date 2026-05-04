// src/app/(main)/layout.tsx

import type { ReactNode } from "react";
import Header from "@/components/user/Header";
import { Toaster } from "react-hot-toast";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--background)]">{children}</main>
      <Toaster
        position="top-right"
        toastOptions={{
          // Bạn có thể chỉnh thời gian hiển thị mặc định (ví dụ 3 giây)
          duration: 3000,
          style: {
            background: "var(--color-panel-elevated)",
            color: "#fff",
          },
        }}
      />
      <footer className="p-5 text-center text-[var(--foreground)]/60 border-t border-[var(--border)] bg-[var(--surface)]">
        © 2026 Mì Cay Store. All rights reserved.
      </footer>
    </>
  );
}
