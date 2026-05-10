// src/components/admin/dashboard/OrderOverview.tsx
import React from "react";
import { IOrderCounts } from "@/types/report.type";
import { ORDER_STATUS_DETAILS, ORDER_STATUS } from "@/constants";
import { Package, Truck, CheckCircle, XCircle } from "lucide-react";

export const OrderOverview: React.FC<{ orderCounts: IOrderCounts }> = ({
  orderCounts,
}) => {
  const getIcon = (status: string) => {
    switch (status) {
      case ORDER_STATUS.PENDING:
        return <Package size={24} />;
      case ORDER_STATUS.SHIPPING:
        return <Truck size={24} />;
      case ORDER_STATUS.DELIVERED:
        return <CheckCircle size={24} />;
      case ORDER_STATUS.CANCELLED:
        return <XCircle size={24} />;
      default:
        return <Package size={24} />;
    }
  };

  const statuses = [
    { key: ORDER_STATUS.PENDING, count: orderCounts.dang_xu_ly || 0 },
    { key: ORDER_STATUS.SHIPPING, count: orderCounts.dang_giao || 0 },
    { key: ORDER_STATUS.DELIVERED, count: orderCounts.da_giao || 0 },
    { key: ORDER_STATUS.CANCELLED, count: orderCounts.da_huy || 0 },
  ];

  return (
    <div className="bg-[var(--color-panel-elevated)] border border-[var(--color-panel-elevated-border)] p-6 rounded-2xl flex flex-col h-full">
      <h3 className="text-lg font-bold text-white mb-4">Trạng thái đơn hàng</h3>
      <div className="grid grid-cols-2 gap-4 flex-1">
        {statuses.map((s) => {
          const config =
            ORDER_STATUS_DETAILS[s.key as keyof typeof ORDER_STATUS_DETAILS];
          return (
            <div
              key={s.key}
              className={`${config.bg} p-4 rounded-xl flex flex-col justify-center items-center text-center transition-transform hover:scale-105 cursor-default`}
            >
              <div className={`${config.color} mb-2`}>{getIcon(s.key)}</div>
              <span className={`text-2xl font-bold ${config.color}`}>
                {s.count}
              </span>
              <span className="text-xs font-medium text-gray-300 mt-1">
                {config.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
