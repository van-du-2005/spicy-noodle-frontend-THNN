// src/components/user/order-detail/OrderItemList.tsx
import React, { useState } from "react";
import Image from "next/image";
import { Eye } from "lucide-react";

import ComboDetailModal from "./ComboDetailModal";

import { IOrderDetailResponse, IOrderDetailItem } from "@/types/order.type";

const formatCurrency = (amount: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);

const OrderItemRow: React.FC<{ item: IOrderDetailItem; onOpenCombo: (item: IOrderDetailItem) => void; }> = ({ item, onOpenCombo }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 py-4 border-b border-[var(--color-panel-elevated-border)] last:border-0">
      <div className="w-20 h-20 shrink-0 bg-[#2a2a2a] rounded-lg border border-[var(--color-border)] relative overflow-hidden">
        <Image src={item.image_url || "/anh_mi_mac_dinh.png"} alt={item.product_name} fill sizes="80px" className="object-cover" unoptimized />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-4">
          <h4 className="text-white font-medium text-base leading-snug">{item.product_name || "Món ăn"}</h4>
          <span className="text-white font-semibold whitespace-nowrap">{formatCurrency(item.price)}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs px-2 py-0.5 rounded bg-red-500/10 text-red-500 border border-red-500/20 font-medium">
            🌶 Cấp độ {item.spicy_level || 0}
          </span>
          <span className="text-sm text-gray-400">x{item.quantity}</span>
        </div>

        {/* Toppings */}
        {item.toppings && item.toppings.length > 0 && (
          <ul className="mt-2 flex flex-col gap-1">
            {item.toppings.map((t, idx) => (
              <li key={idx} className="text-xs text-gray-500 flex justify-between">
                <span>+ {t.topping_name} (x{t.quantity})</span>
                <span>{formatCurrency(t.price * t.quantity)}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Nút Xem Combo */}
        {item.is_combo && (
          <button 
            onClick={() => onOpenCombo(item)}
            className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary)] hover:text-white transition-colors cursor-pointer"
          >
            <Eye size={14} /> Xem chi tiết combo
          </button>
        )}
      </div>
    </div>
  );
};

export const OrderItemList: React.FC<{ items: IOrderDetailResponse["items"]; orderId: number }> = ({ items,  orderId }) => {
  const [selectedCombo, setSelectedCombo] = useState<IOrderDetailItem | null>(null);
  return (
    <div className="bg-[var(--color-panel-elevated)] border border-[var(--color-panel-elevated-border)] rounded-xl p-5 sm:p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-white mb-2">Danh sách món ăn</h3>
      <div className="flex flex-col">
        {(items || []).map((item, idx) => (
          <OrderItemRow key={idx} item={item} onOpenCombo={() => setSelectedCombo(item)} />
        ))}
      </div>

      {/* Render Modal */}
      <ComboDetailModal 
        isOpen={!!selectedCombo}
        onClose={() => setSelectedCombo(null)}
        orderId={orderId}
        orderItemsId={selectedCombo?.order_items_id || null} 
        comboName={selectedCombo?.product_name || ""}
        comboImage={selectedCombo?.image_url || ""}
      />
    </div>
  );
};
export default OrderItemList;