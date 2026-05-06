// src/components/user/ProfileSidebar.tsx

"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { User, FileText, Edit } from "lucide-react";
import { useAuth } from "@/context/auth/AuthContext";
import Image from "next/image";

type NavKey = "account" | "orders";

type Props = {
  onNavigate?: () => void;
};

const ProfileSidebar: React.FC<Props> = ({ onNavigate }) => {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveKey = (): NavKey => {
    if (pathname?.includes("/purchase")) return "orders";
    return "account";
  };

  const active = getActiveKey();
  const { user } = useAuth();  
  const name = user?.name || "Đang tải...";
  const avatar = user?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=ff5a1f&color=ffffff&rounded=true&size=128&format=png`;
 

  const nav = [
    {
      key: "account" as NavKey,
      label: "Tài Khoản Của Tôi",
      Icon: User,
      href: "/user/profile",
    },
    {
      key: "orders" as NavKey,
      label: "Đơn Mua",
      Icon: FileText,
      href: "/user/purchase",
    },
  ];

  const handleNavClick = (href: string) => {
    router.push(href);
    onNavigate?.();
  };

  return (
    <aside
      className="w-full md:w-72 lg:w-80 rounded-lg p-4 shadow-sm"
      aria-label="Sidebar hồ sơ"
      style={{
        backgroundColor: "var(--color-panel-elevated)",
        color: "var(--color-foreground)",
        border: `1px solid var(--color-panel-elevated-border)`,
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <Image
          src={avatar}
          alt={`${name} avatar`}
          width={56} 
          height={56}
          className="w-14 h-14 rounded-full object-cover border"
          style={{ borderColor: "var(--color-panel-elevated-hover)" }}
          priority // Thay thế cho loading="eager" và fetchPriority="high"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3
              className="font-semibold text-white truncate"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {name}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => handleNavClick("/user/profile")}
            className="mt-1 inline-flex items-center gap-2 text-sm transition-colors"
            style={{
              color: "rgba(255,255,255,0.66)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color =
                "var(--color-primary)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color =
                "rgba(255,255,255,0.66)";
            }}
          >
            <Edit size={14} />
            <span className="text-xs">Sửa Hồ Sơ</span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        <ul className="flex md:flex-col gap-3">
          {nav.map(({ key, label, Icon }) => {
            const isActive = active === key;
            return (
              <li key={key} className="w-full">
                <button
                  onClick={() =>
                    handleNavClick(nav.find((n) => n.key === key)?.href || "/")
                  }
                  className="w-full flex items-center gap-3 p-3 rounded-md transition-colors text-left focus:outline-none"
                  style={
                    isActive
                      ? {
                          background:
                            "linear-gradient(90deg, rgba(255,90,31,0.06), transparent)",
                          color: "var(--color-primary)",
                        }
                      : {
                          color: "rgba(255,255,255,0.86)",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "var(--color-primary-2)";
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "rgba(255,255,255,0.02)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "rgba(255,255,255,0.86)";
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "transparent";
                    }
                  }}
                >
                  <Icon size={18} strokeWidth={1.5} />
                  <span className="font-medium">{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
