// src/components/layout/Header.ts

"use client";
import { useAuth } from "@/context/auth/AuthContext";
import { authService } from "@/services/auth.service";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function Header() {
  const { user, loading } = useAuth();

  return (
    <header className="flex items-center justify-between p-5 bg-[var(--surface)] shadow-sm">
      {/* Left: logo */}
      <div className="flex items-center flex-1">
        <Link href="/" className="flex items-center gap-3">
          <Logo className="w-16 h-auto" />
        </Link>
      </div>

      {/* Center: navigation */}
      <nav className="hidden md:flex gap-8 flex-1 justify-center">
        <Link
          href="/"
          className="text-[var(--foreground)] hover:text-[var(--accent)]"
        >
          Trang chủ
        </Link>
        <Link
          href="/menu"
          className="text-[var(--foreground)] hover:text-[var(--accent)]"
        >
          Thực đơn
        </Link>
        <Link
          href="/about"
          className="text-[var(--foreground)] hover:text-[var(--accent)]"
        >
          Giới thiệu
        </Link>
        <Link
          href="/contact"
          className="text-[var(--foreground)] hover:text-[var(--accent)]"
        >
          Liên hệ
        </Link>
      </nav>

      {/* Right: search, cart, auth */}
      <div className="flex items-center gap-3 justify-end flex-1">
        <div className="hidden sm:block">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none w-56"
          />
        </div>

        <button
          aria-label="Giỏ hàng"
          className="p-2 rounded-md hover:bg-[var(--surface-hover)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-[var(--foreground)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 5h13"
            />
          </svg>
        </button>

        <div>
          {loading ? (
            <span className="text-[var(--foreground)]/60 italic">
              Đang tải...
            </span>
          ) : user ? (
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-9 h-9 rounded-full border border-[var(--border)]"
              />
              <span className="font-medium text-[var(--foreground)]">
                Chào, {user.name}
              </span>
              <button
                onClick={() =>
                  (window.location.href = authService.getLogoutUrl())
                }
                className="text-sm text-[var(--foreground)]/80 hover:text-[var(--accent)] underline"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg transition bg-[var(--accent)] text-[var(--background)] hover:bg-[var(--accent-2)]"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
