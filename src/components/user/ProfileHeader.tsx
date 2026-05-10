// src/components/user/ProfileHeader.tsx

import React from "react";

type Props = {
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
};

const ProfileHeader: React.FC<Props> = ({ title, subtitle, rightElement }) => {
  return (
    <header
      className="w-full bg-[var(--color-panel-elevated)] text-[var(--color-foreground)]"
      style={{ borderBottom: `1px solid var(--color-panel-elevated-border)` }}
    >
      <div className="max-w-[1200px] mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h1
            className="text-2xl sm:text-3xl font-semibold text-white truncate"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="mt-1 text-sm text-white truncate"
            >
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3">
          {rightElement ? (
            rightElement
          ) : (
            <button
              type="button"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-white font-medium bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-2)] hover:opacity-90 transition-opacity"
            >
              Thao tác
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
