// src/components/user/order-detail/PaymentSummary.tsx
import React from "react";
import { IOrderDetailResponse } from "@/types/order.type";
import { PAYMENT_METHOD } from "@/constants";

type Props = {
  summary: IOrderDetailResponse["payment_summary"];
  info: IOrderDetailResponse["order_info"];
};

const formatCurrency = (amount: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Number(amount) || 0);

const PaymentSummary: React.FC<Props> = ({ summary, info }) => {
  return (
    <div className="bg-[var(--color-panel-elevated)] border border-[var(--color-panel-elevated-border)] rounded-xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row justify-between items-end sm:items-center gap-6">
      
      {/* Phương thức thanh toán */}
      <div className="w-full sm:w-auto bg-[var(--color-panel-elevated-2)] p-4 rounded-lg">
        <span className="text-sm text-gray-400 block mb-1">Phương thức thanh toán:</span>
        <span className="text-white font-medium">
          {info.payment_method === PAYMENT_METHOD.COD ? "Thanh toán khi nhận hàng (COD)" : "Chuyển khoản"}
        </span>
      </div>

      {/* Tổng kết tiền */}
      <div className="w-full sm:w-64 flex flex-col gap-3">
        <div className="flex justify-between items-center text-sm text-gray-300">
          <span>Tạm tính</span>
          <span>{formatCurrency(summary.subtotal_amount)}</span>
        </div>
        <div className="flex justify-between items-center text-sm text-green-500">
          <span>Giảm giá</span>
          <span>- {formatCurrency(summary.discount_amount)}</span>
        </div>
        <div className="w-full border-t border-[var(--color-panel-elevated-border)] my-1" />
        <div className="flex justify-between items-end">
          <span className="text-base font-semibold text-white mb-0.5">Tổng cộng</span>
          <span className="text-xl font-bold text-[var(--color-primary)]">{formatCurrency(summary.total_amount)}</span>
        </div>
      </div>
    </div>
  );
};
export default PaymentSummary;