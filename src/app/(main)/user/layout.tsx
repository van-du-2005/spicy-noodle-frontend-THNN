// src/app/(main)/user/layout.tsx

"use client";

import React from "react";
import { Menu, X } from "lucide-react";
import ProfileSidebar from "@/components/user/ProfileSidebar";
import MobileDrawer from "@/components/ui/MobileDrawer";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleNavigate = () => {
    setDrawerOpen(false);
  };

  return (
    <div className="user-layout">
      {/* Desktop Header (with hamburger) */}
      <div className="user-layout-header">
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          className="user-layout-hamburger"
          aria-label="Toggle navigation menu"
        >
          {drawerOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Main Layout */}
      <div className="user-layout-container">
        {/* Sidebar - Desktop only */}
        <aside className="user-layout-sidebar">
          <ProfileSidebar onNavigate={handleNavigate} />
        </aside>

        {/* Mobile Drawer */}
        <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <div style={{ padding: "1rem 0" }}>
            <ProfileSidebar onNavigate={handleNavigate} />
          </div>
        </MobileDrawer>

        {/* Main Content */}
        <main className="user-layout-content">{children}</main>
      </div>

      <style jsx>{`
        .user-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .user-layout-header {
          display: none;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--color-panel-elevated);
          border-bottom: 1px solid var(--color-panel-elevated-border);
        }

        .user-layout-hamburger {
          border: 0;
          background: transparent;
          color: var(--color-foreground);
          cursor: pointer;
          transition: color 150ms ease;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-layout-hamburger:hover {
          color: var(--color-primary);
        }

        .user-layout-container {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 0;
          flex: 1;
        }

        .user-layout-sidebar {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
          background: var(--color-panel-elevated);
          border-right: 1px solid var(--color-panel-elevated-border);
          padding: 1.5rem 1rem;
        }

        .user-layout-content {
          flex: 1;
          overflow-y: auto;
          background: var(--color-background);
          padding: 2rem 1rem;
        }

        @media (max-width: 768px) {
          .user-layout-header {
            display: flex;
          }

          .user-layout-container {
            grid-template-columns: 1fr;
          }

          .user-layout-sidebar {
            display: none;
          }

          .user-layout-content {
            padding: 1.5rem 1rem;
          }
        }

        @media (max-width: 640px) {
          .user-layout-content {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
