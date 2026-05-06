// src/components/user/order-detail/ComboDetailModal.tsx

import React from "react";
import Image from "next/image";
import { X, Loader2, Package, Plus } from "lucide-react";
import { useComboDetail } from "@/hooks/useComboDetail";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  orderId: number | null;
  orderItemsId: number | null;
  comboName: string;
  comboImage: string;
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    amount,
  );

const ComboDetailModal: React.FC<Props> = ({
  isOpen,
  onClose,
  orderId,
  orderItemsId,
  comboName,
  comboImage,
}) => {
  // Gọi hook (Data sẽ tự fetch khi orderId và orderItemsId khác null)
  const { data, loading, error } = useComboDetail(orderId, orderItemsId);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20  p-4 transition-opacity">
      {/* Khối Modal chính */}
      <div className="bg-[var(--color-panel-elevated)] border border-[var(--color-panel-elevated-border)] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header: Nút Close & Ảnh Combo lớn */}
        <div className="relative w-full h-32 sm:h-40 bg-[#1a1a1a] shrink-0 overflow-hidden">
          <Image
            src={comboImage || "/anh_mi_mac_dinh.png"}
            alt={comboName}
            fill
            className="object-cover opacity-80"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-panel-elevated)] to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-red-500/80 text-white rounded-full backdrop-blur-md transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>

          <h3 className="absolute bottom-4 left-5 right-5 text-xl font-bold text-white drop-shadow-md truncate">
            {comboName}
          </h3>
        </div>

        {/* Body: Nội dung chi tiết */}
        <div className="p-5 overflow-y-auto flex-1 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10 gap-3 text-[var(--color-primary)]">
              <Loader2 size={32} className="animate-spin" />
              <span className="text-sm font-medium">Đang tải chi tiết...</span>
            </div>
          ) : error ? (
            <div className="text-center py-6 text-red-400">{error}</div>
          ) : data ? (
            <div className="flex flex-col gap-6">
              {/* Thành phần Combo */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                  <Package size={16} /> Món thành phần
                </h4>
                <ul className="flex flex-col gap-3">
                  {data.combo_components.map((comp, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 bg-[var(--color-panel-elevated-2)] p-2.5 rounded-lg border border-[var(--color-border)]"
                    >
                      <Image
                        src={comp.component_image || "/anh_mi_mac_dinh.png"}
                        alt={comp.component_name}
                        width={40}
                        height={40}
                        className="rounded object-cover"
                        unoptimized
                      />
                      <div className="flex-1">
                        <p className="text-sm text-white font-medium">
                          {comp.component_name}
                        </p>
                        <p className="text-xs text-gray-400">
                          Số lượng: {comp.quantity_per_combo}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Topping mua thêm */}
              {data.extra_toppings && data.extra_toppings.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                    <Plus size={16} /> Topping gọi thêm
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {data.extra_toppings.map((top, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between items-center text-sm border-b border-dashed border-gray-700 pb-2 last:border-0"
                      >
                        <span className="text-gray-300">
                          {top.topping_name}{" "}
                          <span className="text-xs text-gray-500">
                            (x{top.quantity})
                          </span>
                        </span>
                        <span className="text-white font-medium">
                          {formatCurrency(top.price * top.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Footer: Thành tiền */}
        {!loading && data && (
          <div className="p-5 border-t border-[var(--color-panel-elevated-border)] bg-[var(--color-panel-elevated-2)] flex justify-between items-center">
            <span className="text-gray-400 font-medium text-sm">
              Thành tiền dòng này
            </span>
            <span className="text-[var(--color-primary)] font-bold text-lg">
              {formatCurrency(data.item_subtotal)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComboDetailModal;
