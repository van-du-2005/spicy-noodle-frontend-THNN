// src/components/admin/dashboard/RevenueCards.tsx
import React from "react";
import { IRevenue } from "@/types/report.type";
import { DollarSign, TrendingUp, Wallet } from "lucide-react";

const formatCurrency = (amount: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);

export const RevenueCards: React.FC<{ revenue: IRevenue }> = ({ revenue }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-[var(--color-panel-elevated)] border border-[var(--color-panel-elevated-border)] p-5 rounded-2xl flex items-center gap-4">
        <div className="p-3 bg-blue-500/10 rounded-full text-blue-500"><DollarSign size={24} /></div>
        <div>
          <p className="text-sm text-gray-400">Hôm nay</p>
          <p className="text-xl font-bold text-white">{formatCurrency(revenue.today)}</p>
        </div>
      </div>
      <div className="bg-[var(--color-panel-elevated)] border border-[var(--color-panel-elevated-border)] p-5 rounded-2xl flex items-center gap-4">
        <div className="p-3 bg-green-500/10 rounded-full text-green-500"><TrendingUp size={24} /></div>
        <div>
          <p className="text-sm text-gray-400">Tháng này</p>
          <p className="text-xl font-bold text-white">{formatCurrency(revenue.this_month)}</p>
        </div>
      </div>
      <div className="bg-[var(--color-panel-elevated)] border border-[var(--color-panel-elevated-border)] p-5 rounded-2xl flex items-center gap-4">
        <div className="p-3 bg-purple-500/10 rounded-full text-purple-500"><Wallet size={24} /></div>
        <div>
          <p className="text-sm text-gray-400">Năm nay</p>
          <p className="text-xl font-bold text-white">{formatCurrency(revenue.this_year)}</p>
        </div>
      </div>
    </div>
  );
};