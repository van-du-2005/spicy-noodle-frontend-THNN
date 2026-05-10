// src/components/user/OrderTabs.tsx

import React from "react";

type TabKey = "processing" | "shipping" | "delivered" | "cancelled";

type Props = {
  active?: TabKey;
  onChange?: (key: TabKey) => void;
};

const TABS: { key: TabKey; label: string }[] = [
  { key: "processing", label: "Đang xử lý" },
  { key: "shipping", label: "Đang giao" },
  { key: "delivered", label: "Đã giao" },
  { key: "cancelled", label: "Đã hủy" },
];

const OrderTabs: React.FC<Props> = ({ active: activeProp, onChange }) => {
  const [active, setActive] = React.useState<TabKey>(
    activeProp ?? "processing",
  );

  React.useEffect(() => {
    if (activeProp) setActive(activeProp);
  }, [activeProp]);

  function handleClick(key: TabKey) {
    setActive(key);
    onChange?.(key);
  }

  return (
    <div
      className="w-full overflow-x-auto"
      style={{
        background: "var(--color-panel-elevated)",
        borderBottom: "1px solid var(--color-panel-elevated-border)",
      }}
    >
      <nav className="max-w-[1200px] mx-auto px-4">
        <ul className="flex justify-between gap-4 min-w-[600px] md:min-w-0">
          {TABS.map((t) => {
            const isActive = active === t.key;
            return (
              <li key={t.key} className="flex-1">
                <button
                  onClick={() => handleClick(t.key)}
                  className={`w-full flex flex-col items-center py-4 text-sm transition-colors focus:outline-none`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span
                    className={`font-medium ${
                      isActive ? "text-[var(--color-primary)]" : "text-white"
                    }`}
                  >
                    {t.label}
                  </span>
                  <span
                    className={`block h-0.5 mt-3 w-full transition-colors ${
                      isActive ? "bg-[var(--color-primary)]" : "bg-transparent"
                    }`}
                    style={{ maxWidth: isActive ? "100%" : "100%" }}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default OrderTabs;
