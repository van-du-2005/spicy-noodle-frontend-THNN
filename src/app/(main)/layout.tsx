import type { ReactNode } from "react";
import Header from "@/components/user/Header";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/user/Footer";

// 1. Import Context và Drawer (bỏ dấu ngoặc nhọn ở CartDrawer)
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    // 2. Bọc CartProvider bao quanh toàn bộ nội dung của MainLayout
    <CartProvider>
      <Header />

      <main className="min-h-screen bg-[var(--background)]">{children}</main>

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

      <Footer />

      {/* 3. Gọi ngăn kéo Giỏ hàng ra ở cuối cùng */}
      <CartDrawer />
    </CartProvider>
  );
}
