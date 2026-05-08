// src/components/user/OrderCard.tsx
import React from "react";
import Link from "next/link";
import { IOrderSummary } from "@/types/order.type";
import { ORDER_STATUS_DETAILS } from "@/constants";
import Image from "next/image";

type Props = {
  order: IOrderSummary;
};

const formatCurrency = (amount: string | number) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Number(amount));
};

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeStyle: "short" }).format(new Date(dateString));
};

const OrderCard: React.FC<Props> = ({ order }) => {
  const statusInfo = ORDER_STATUS_DETAILS[order.order_status] || { label: order.order_status, color: "text-white", bg: "bg-gray-500/10" };

  return (
    <div className="bg-[var(--color-panel-elevated)] border border-[var(--color-panel-elevated-border)] rounded-xl p-4 sm:p-5 shadow-sm transition-all hover:border-[var(--color-primary)]/50">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-[var(--color-panel-elevated-border)]">
        <div className="flex flex-col">
          <span className="text-white font-semibold">Đơn hàng #{order.orders_id}</span>
          <span className="text-xs text-gray-400 mt-1">{formatDate(order.createdAt)}</span>
        </div>
        <div className={`px-3 py-1.5 rounded-full text-xs font-semibold ${statusInfo.bg} ${statusInfo.color}`}>
          {statusInfo.label}
        </div>
      </div>

      {/* Body: Sản phẩm đại diện */}
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 shrink-0 bg-[#2a2a2a] rounded-lg overflow-hidden border border-[var(--color-border)] relative">
          <Image 
            src={order.representative_image || "/anh_mi_mac_dinh.png"} 
            alt={order.representative_name} 
            fill // Dùng fill nếu bạn muốn ảnh tự động lấp đầy thẻ div bọc ngoài (thay cho width/height cứng)
            sizes="80px"
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium text-base truncate">{order.representative_name}</h4>
          {order.total_items_count > 1 && (
            <p className="text-sm text-gray-400 mt-1.5">
              và {order.total_items_count - 1} sản phẩm khác...
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 pt-4 border-t border-[var(--color-panel-elevated-border)] flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-gray-300 w-full sm:w-auto text-center sm:text-left">
          Thành tiền: <span className="text-[var(--color-primary)] font-bold text-lg ml-1">{formatCurrency(order.total_amount)}</span>
        </div>
        <Link 
          href={`/user/purchase/${order.orders_id}`}
          className="w-full sm:w-auto px-6 py-2.5 bg-[var(--color-primary)] hover:brightness-110 text-white text-sm font-semibold rounded-lg transition-all text-center"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default OrderCard;