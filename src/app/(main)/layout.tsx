import type { ReactNode } from "react";
import Header from "@/components/user/Header";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--background)]">{children}</main>
      <footer className="p-5 text-center text-[var(--foreground)]/60 border-t border-[var(--border)] bg-[var(--surface)]">
        © 2026 Mì Cay Store. All rights reserved.
      </footer>
    </>
  );
}
