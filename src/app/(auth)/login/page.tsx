// src/app/login/page.tsx

"use client";
import { useState } from "react";
import { authService } from "@/services/auth.service";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-[calc(100vh-8rem)] overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,90,31,0.13),transparent_30%),linear-gradient(180deg,#090303_0%,#140607_52%,#090303_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#ff5a1f]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#8b0f17]/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl items-center justify-center">
        <div className="w-full max-w-md rounded-[1.6rem] border border-border bg-[linear-gradient(180deg,rgba(16,5,6,0.96),rgba(9,3,4,0.98))] px-5 py-6 shadow-[0_0_0_1px_rgba(255,90,31,0.05),0_24px_90px_rgba(0,0,0,0.65)] ring-1 ring-white/5 sm:px-7 sm:py-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                Đăng nhập
              </h1>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="h-12 w-full rounded-xl border border-[#3f2a2c] bg-[#120607] px-4 text-[15px] text-foreground placeholder:text-[#b3a8a8] outline-none transition focus:border-[#ff6a33] focus:ring-2 focus:ring-[#ff5a1f]/20"
              />
            </div>

            <div>
              <div className="flex h-12 items-center rounded-xl border border-[#3f2a2c] bg-[#120607] px-4 transition focus-within:border-[#ff6a33] focus-within:ring-2 focus-within:ring-[#ff5a1f]/20">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu"
                  className="h-full flex-1 bg-transparent text-[15px] text-foreground placeholder:text-[#b3a8a8] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="ml-3 flex h-8 w-8 items-center justify-center rounded-full text-[#b3a8a8] transition hover:bg-white/5 hover:text-[#e4dddd]"
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <button
              type="button"
              className="mt-1 flex h-12 w-full items-center justify-center rounded-xl bg-[linear-gradient(180deg,#ff7a33_0%,#ff551d_100%)] text-sm font-extrabold uppercase tracking-[0.22em] text-white shadow-[0_0_24px_rgba(255,90,31,0.28),0_0_44px_rgba(255,90,31,0.18)] transition hover:brightness-110 hover:shadow-[0_0_30px_rgba(255,90,31,0.38),0_0_56px_rgba(255,90,31,0.24)] active:scale-[0.99]"
            >
              Đăng nhập
            </button>

            <div className="flex justify-start">
              <button
                type="button"
                className="text-sm text-[#8bdde8] transition hover:text-[#b9f0f6]"
              >
                Quên mật khẩu
              </button>
            </div>

            <div className="flex items-center gap-3 py-1">
              <div className="h-px flex-1 bg-[#342123]" />
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#c8bcbc]">
                hoặc
              </span>
              <div className="h-px flex-1 bg-[#342123]" />
            </div>

            <button
              type="button"
              onClick={() =>
                (window.location.href = authService.getGoogleLoginUrl())
              }
              className="flex h-12 w-full items-center gap-3 rounded-xl border border-[#3f2a2c] bg-[#120607] px-4 text-left text-[15px] font-medium text-white transition hover:border-[#5b3b3d] hover:bg-[#160809]"
            >
              <span className="flex h-6 w-6 items-center justify-center">
                <GoogleMark />
              </span>
              <span className="flex-1 text-center pr-6">Google</span>
            </button>

            <div className="space-y-3 pt-2 text-sm leading-6 text-[#b7aaaa]">
              <p>
                Bằng việc đăng nhập, bạn đồng ý với{" "}
                <Link
                  href="#"
                  className="text-[#ff7a33] transition hover:text-[#ff9a5e]"
                >
                  Điều khoản dịch vụ
                </Link>{" "}
                &amp;{" "}
                <Link
                  href="#"
                  className="text-[#ff7a33] transition hover:text-[#ff9a5e]"
                >
                  Chính sách bảo mật
                </Link>{" "}
                của Mì cay.
              </p>

              <p>
                Bạn mới biết đến Mì cay?{" "}
                <Link
                  href="#"
                  className="text-[#ff7a33] transition hover:text-[#ff9a5e]"
                >
                  Đăng ký
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M3 3l18 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M10.6 10.6A2.8 2.8 0 0 0 12 16.8c1.54 0 2.8-1.26 2.8-2.8 0-.48-.12-.93-.33-1.33"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.3 6.7C4.1 8.2 2.5 12 2.5 12s3.5 6.5 9.5 6.5c1.2 0 2.3-.18 3.2-.48"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.9 5.9C13.98 5.64 13.01 5.5 12 5.5 6 5.5 2.5 12 2.5 12c.4.74 1.08 1.76 2.03 2.76"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-5 w-5">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.302 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.058 5.053 29.285 3 24 3 12.955 3 4 11.955 4 23s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917Z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691 12.876 19.51C14.655 15.108 18.962 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.058 5.053 29.285 3 24 3c-7.682 0-14.373 4.337-17.694 10.691Z"
      />
      <path
        fill="#4CAF50"
        d="M24 43c5.178 0 9.865-1.982 13.394-5.209l-6.183-5.237C29.152 34.675 26.748 36 24 36c-5.281 0-9.621-3.322-11.276-7.963l-6.52 5.002C9.47 39.107 16.048 43 24 43Z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-1.303 3.678-4.07 6.462-7.116 8.554l.003-.002 6.183 5.237C33.63 39.614 44 32.5 44 23c0-1.341-.138-2.651-.389-3.917Z"
      />
    </svg>
  );
}
