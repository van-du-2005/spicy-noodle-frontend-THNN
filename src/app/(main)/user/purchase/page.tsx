"use client";

import React from "react";
import OrderTabs from "@/components/user/OrderTabs";

type TabKey = "processing" | "shipping" | "delivered" | "cancelled";

export default function PurchasePage() {
  const [activeTab, setActiveTab] = React.useState<TabKey>("processing");

  return (
    <div className="purchase-page">
      <OrderTabs active={activeTab} onChange={setActiveTab} />

      <div className="purchase-page-body">
        <div className="purchase-page-placeholder">
          <div className="placeholder-icon">📦</div>
          <h2>Đơn hàng {activeTab}</h2>
          <p>Nội dung trang đang được phát triển</p>
        </div>
      </div>

      <style jsx>{`
        .purchase-page {
          display: flex;
          flex-direction: column;
          gap: 0;
          width: 100%;
        }

        .purchase-page-body {
          flex: 1;
          padding: 2rem 1rem;
          background: var(--color-background);
        }

        .purchase-page-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 4rem 2rem;
          text-align: center;
          min-height: 400px;
          color: var(--color-foreground);
        }

        .placeholder-icon {
          font-size: 3rem;
        }

        .purchase-page-placeholder h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
          text-transform: capitalize;
        }

        .purchase-page-placeholder p {
          color: var(--color-foreground) / 0.7;
          margin: 0;
        }

        @media (max-width: 768px) {
          .purchase-page-body {
            padding: 1.5rem 1rem;
          }

          .purchase-page-placeholder {
            min-height: 300px;
            padding: 2rem 1rem;
          }

          .placeholder-icon {
            font-size: 2rem;
          }

          .purchase-page-placeholder h2 {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
