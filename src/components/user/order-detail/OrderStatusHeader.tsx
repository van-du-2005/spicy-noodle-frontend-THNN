// src/components/user/order-detail/OrderStatusHeader.tsx
import React from "react";
import { IOrderDetailResponse } from "@/types/order.type";
import { ORDER_STATUS_DETAILS, ORDER_STATUS } from "@/constants";
import { CheckCircle2, Clock, Truck, XCircle } from "lucide-react";

type Props = {
  info: IOrderDetailResponse["order_info"];
};

const formatDate = (date?: string) => {
  if (!date) return "Ngày không xác định";
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(date));
};

const OrderStatusHeader: React.FC<Props> = ({ info }) => {
  const statusConfig = ORDER_STATUS_DETAILS[info.order_status];
  const isCancelled = info.order_status === ORDER_STATUS.CANCELLED;

  return (
    <div className="bg-[var(--color-panel-elevated)] border border-[var(--color-panel-elevated-border)] rounded-xl p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-[var(--color-panel-elevated-border)]">
        <div>
          <h2 className="text-xl font-bold text-white">Đơn hàng #{info.orders_id}</h2>
          <p className="text-sm text-gray-400 mt-1">Ngày đặt: {formatDate(info.createdAt)}</p>
        </div>
        <div className={`px-4 py-2 rounded-lg text-sm font-semibold ${statusConfig?.bg} ${statusConfig?.color} flex items-center gap-2`}>
          {isCancelled ? <XCircle size={18} /> : <CheckCircle2 size={18} />}
          {statusConfig?.label || "Trạng thái không xác định"}
        </div>
      </div>

      {/* Progress Bar (Chỉ hiện nếu không bị hủy) */}
      {!isCancelled && (
        <div className="relative w-full flex justify-between items-center mt-8">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-700/50 rounded-full" />
          
          <div className={`z-10 flex flex-col items-center gap-2 px-2 bg-[var(--color-panel-elevated)] text-[var(--color-primary)]`}>
             <Clock size={24} className="bg-[var(--color-primary)] text-white rounded-full p-1" />
             <span className="text-xs font-medium">Chờ xử lý</span>
          </div>
          
          <div className={`z-10 flex flex-col items-center gap-2 px-2 bg-[var(--color-panel-elevated)] transition-colors ${info.order_status === ORDER_STATUS.SHIPPING || info.order_status === ORDER_STATUS.DELIVERED ? "text-blue-500" : "text-gray-500"}`}>
             <Truck size={24} className={`${info.order_status === ORDER_STATUS.SHIPPING || info.order_status === ORDER_STATUS.DELIVERED ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-400"} rounded-full p-1 transition-colors`} />
             <span className="text-xs font-medium">Đang giao</span>
          </div>

          <div className={`z-10 flex flex-col items-center gap-2 px-2 bg-[var(--color-panel-elevated)] transition-colors ${info.order_status === ORDER_STATUS.DELIVERED ? "text-green-500" : "text-gray-500"}`}>
             <CheckCircle2 size={24} className={`${info.order_status === ORDER_STATUS.DELIVERED ? "bg-green-500 text-white" : "bg-gray-700 text-gray-400"} rounded-full p-1 transition-colors`} />
             <span className="text-xs font-medium">Đã giao</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default OrderStatusHeader;