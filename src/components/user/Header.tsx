// src/components/layout/Header.ts

"use client";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/auth/AuthContext";
import { authService } from "@/services/auth.service";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/svg/Logo";
import { Search, ShoppingCart } from "lucide-react";

export default function Header() {
  const { user, setUser, loading } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fullName = (user?.name ?? "").trim();
  const nameParts = fullName.split(/\s+/).filter(Boolean);
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts[nameParts.length - 1] ?? "";
  const displayNameTruncated =
    lastName.length > 12 ? lastName.slice(0, 12) + "..." : lastName;

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setIsUserMenuOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsUserMenuOpen(false);
    }, 150);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null); // Xóa user khỏi trạng thái hiện tại
      setIsUserMenuOpen(false);
      window.location.href = "/"; // Đẩy về trang chủ và reload
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    }
  };

  // return (
  //   <header className="flex items-center justify-between overflow-visible bg-surface p-5 shadow-sm">
  //     {/* Left: logo */}
  //     <div className="flex items-center flex-1">
  //       <Link href="/" className="flex items-center gap-3">
  //         <Logo className="w-16 h-auto" />
  //       </Link>
  //     </div>

  //     {/* Center: navigation */}
  //     <nav className="hidden md:flex gap-8 flex-1 justify-center">
  //       <Link href="/" className="text-foreground hover:text-primary">
  //         Trang chủ
  //       </Link>
  //       <Link href="/menu" className="text-foreground hover:text-primary">
  //         Thực đơn
  //       </Link>
  //       <Link href="/about" className="text-foreground hover:text-primary">
  //         Giới thiệu
  //       </Link>
  //       <Link href="/contact" className="text-foreground hover:text-primary">
  //         Liên hệ
  //       </Link>
  //     </nav>

  //     {/* Right: search, cart, auth */}
  //     <div className="flex items-center gap-3 justify-end flex-1">
  //       <div className="hidden sm:block">
  //         <input
  //           type="text"
  //           placeholder="Tìm kiếm..."
  //           className="w-56 rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none"
  //         />
  //       </div>

  //       <button
  //         aria-label="Giỏ hàng"
  //         className="rounded-md p-2 hover:bg-surface-2"
  //       >
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           className="h-6 w-6 text-foreground"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke="currentColor"
  //         >
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth="2"
  //             d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 5h13"
  //           />
  //         </svg>
  //       </button>

  // <div>
  //   {loading ? (
  //     <span className="text-foreground/60 italic">Đang tải...</span>
  //   ) : user ? (
  //     <div
  //       className="relative"
  //       ref={userMenuRef}
  //       onMouseEnter={handleMouseEnter}
  //       onMouseLeave={handleMouseLeave}
  //     >
  //       <button
  //         type="button"
  //         onClick={() => setIsUserMenuOpen((current) => !current)}
  //         className="flex items-center gap-2 rounded-lg border border-transparent bg-transparent px-2 py-1.5 text-left transition duration-200 hover:bg-[rgba(255,90,31,0.08)] focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
  //         aria-haspopup="menu"
  //         aria-expanded={isUserMenuOpen}
  //       >
  //         <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[radial-gradient(circle_at_top,#ff8a1f_0%,#7a141c_40%,#170608_100%)] shadow-[0_0_0_1px_rgba(255,90,31,0.08),0_0_18px_rgba(255,90,31,0.12)]">
  //           {user.avatar_url ? (
  //             <Image
  //               src={user.avatar_url}
  //               alt="avatar"
  //               referrerPolicy="no-referrer"
  //               fill
  //               sizes="40px"
  //               unoptimized
  //               className="object-cover"
  //             />
  //           ) : (
  //             <span className="text-sm font-semibold uppercase text-white">
  //               {firstName.slice(0, 1)}
  //             </span>
  //           )}
  //         </span>

  //         <span className="hidden max-w-32 truncate text-sm font-semibold text-primary sm:block">
  //           {displayNameTruncated}
  //         </span>
  //       </button>

  //       {isUserMenuOpen ? (
  //         <div className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-xl border border-panel-elevated-border bg-linear-to-b from-panel-elevated-2 to-panel-elevated shadow-[0_12px_40px_rgba(255,90,31,0.15)] before:absolute before:-top-2 before:right-6 before:h-4 before:w-4 before:rotate-45 before:border-l before:border-t before:border-panel-elevated-border before:bg-panel-elevated before:content-['']">
  //           <div className="border-b border-[rgba(255,90,31,0.15)] px-4 py-3">
  //             <Link
  //               href="/user/profile"
  //               onClick={() => setIsUserMenuOpen(false)}
  //               className="block text-xs font-semibold tracking-wide uppercase text-foreground/70 transition-colors duration-150 hover:bg-[rgba(255,90,31,0.12)] hover:text-primary rounded px-2 py-1.5 -mx-2 -my-1.5"
  //             >
  //               Tài Khoản Của Tôi
  //             </Link>
  //           </div>

  //           <div className="py-2">
  //             <Link
  //               href="/user/purchase"
  //               onClick={() => setIsUserMenuOpen(false)}
  //               className="block px-4 py-2.5 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-[rgba(255,90,31,0.12)] hover:text-primary rounded mx-2"
  //             >
  //               Đơn Mua
  //             </Link>
  //           </div>

  //           <div className="border-t border-[rgba(255,90,31,0.15)] px-4 py-3">
  //             <button
  //               type="button"
  //               onClick={handleLogout}
  //               className="w-full text-left text-sm font-medium text-primary transition-colors duration-150 hover:text-accent-2 hover:bg-[rgba(255,90,31,0.12)] cursor-pointer rounded px-2 py-1.5 -mx-2 -my-1.5"
  //             >
  //               Đăng Xuất
  //             </button>
  //           </div>
  //         </div>
  //       ) : null}
  //     </div>
  //   ) : (
  //     <Link
  //       href="/login"
  //       className="rounded-lg bg-primary px-4 py-2 text-background transition hover:bg-primary-2 cursor-pointer"
  //     >
  //       Đăng nhập
  //     </Link>
  //   )}
  // </div>
  //     </div>
  //   </header>
  // );
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between overflow-visible bg-gray-950/95 backdrop-blur-md px-5 py-3 shadow-md border-b border-gray-800">
      {/* Left: Logo & Brand Name */}
      <div className="flex items-center flex-1">
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <Logo className="w-12 h-auto text-primary transition-transform group-hover:scale-105" />
          {/* Thêm chữ Mì Cay Đỉnh giống trong ảnh */}
          <span className="text-xl font-black tracking-tight text-white hidden sm:block">
            Mì Cay <span className="text-orange-500">Đỉnh</span>
          </span>
        </Link>
      </div>

      {/* Center: navigation */}
      <nav className="hidden md:flex gap-8 flex-1 justify-center">
        {/* Chỉnh lại màu text mặc định là xám sáng, hover sáng màu cam */}
        <Link
          href="/"
          className="text-gray-300 font-medium transition-colors hover:text-primary cursor-pointer"
        >
          Trang chủ
        </Link>
        <Link
          href="/menu"
          className="text-gray-300 font-medium transition-colors hover:text-primary cursor-pointer"
        >
          Thực đơn
        </Link>
        <Link
          href="/about"
          className="text-gray-300 font-medium transition-colors hover:text-primary cursor-pointer"
        >
          Giới thiệu
        </Link>
        <Link
          href="/contact"
          className="text-gray-300 font-medium transition-colors hover:text-primary cursor-pointer"
        >
          Liên hệ
        </Link>
        <Link href="/chatbot" className="text-foreground hover:text-primary">
          Chatbot
        </Link>
      </nav>

      {/* Right: search, cart, auth */}
      <div className="flex items-center gap-4 justify-end flex-1">
        {/* Khung tìm kiếm có Icon */}
        <div className="hidden sm:block relative group">
          <input
            type="text"
            placeholder="Tìm kiếm món ăn..."
            className="w-56 rounded-full border border-gray-700 bg-gray-900 px-4 py-2 pr-10 text-sm text-gray-200 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all group-hover:border-gray-500"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 cursor-pointer hover:text-primary transition-colors" />
        </div>

        {/* Nút Giỏ hàng mới */}
        <button
          aria-label="Giỏ hàng"
          className="relative rounded-full p-2.5 text-gray-300 hover:bg-gray-800 hover:text-primary transition-colors cursor-pointer"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            0
          </span>
        </button>

        {/* User Auth */}
        <div>
          {loading ? (
            <span className="text-foreground/60 italic">Đang tải...</span>
          ) : user ? (
            <div
              className="relative"
              ref={userMenuRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setIsUserMenuOpen((current) => !current)}
                className="flex items-center gap-2 rounded-lg border border-transparent bg-transparent px-2 py-1.5 text-left transition duration-200 hover:bg-[rgba(255,90,31,0.08)] focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
                aria-haspopup="menu"
                aria-expanded={isUserMenuOpen}
              >
                <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[radial-gradient(circle_at_top,#ff8a1f_0%,#7a141c_40%,#170608_100%)] shadow-[0_0_0_1px_rgba(255,90,31,0.08),0_0_18px_rgba(255,90,31,0.12)]">
                  {user.avatar_url ? (
                    <Image
                      src={user.avatar_url}
                      alt="avatar"
                      referrerPolicy="no-referrer"
                      fill
                      sizes="40px"
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-sm font-semibold uppercase text-white">
                      {firstName.slice(0, 1)}
                    </span>
                  )}
                </span>

                <span className="hidden max-w-32 truncate text-sm font-semibold text-primary sm:block">
                  {displayNameTruncated}
                </span>
              </button>

              {isUserMenuOpen ? (
                <div className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-xl border border-panel-elevated-border bg-linear-to-b from-panel-elevated-2 to-panel-elevated shadow-[0_12px_40px_rgba(255,90,31,0.15)] before:absolute before:-top-2 before:right-6 before:h-4 before:w-4 before:rotate-45 before:border-l before:border-t before:border-panel-elevated-border before:bg-panel-elevated before:content-['']">
                  <div className="border-b border-[rgba(255,90,31,0.15)] px-4 py-3">
                    <Link
                      href="/user/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block text-xs font-semibold tracking-wide uppercase text-foreground/70 transition-colors duration-150 hover:bg-[rgba(255,90,31,0.12)] hover:text-primary rounded px-2 py-1.5 -mx-2 -my-1.5"
                    >
                      Tài Khoản Của Tôi
                    </Link>
                  </div>

                  <div className="py-2">
                    <Link
                      href="/user/purchase"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-[rgba(255,90,31,0.12)] hover:text-primary rounded mx-2"
                    >
                      Đơn Mua
                    </Link>
                  </div>

                  <div className="border-t border-[rgba(255,90,31,0.15)] px-4 py-3">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left text-sm font-medium text-primary transition-colors duration-150 hover:text-accent-2 hover:bg-[rgba(255,90,31,0.12)] cursor-pointer rounded px-2 py-1.5 -mx-2 -my-1.5"
                    >
                      Đăng Xuất
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-primary px-4 py-2 text-background transition hover:bg-primary-2 cursor-pointer"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
