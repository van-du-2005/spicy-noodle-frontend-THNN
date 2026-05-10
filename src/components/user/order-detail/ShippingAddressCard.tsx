// src/components/user/order-detail/ShippingAddressCard.tsx
import React from "react";
import { IOrderDetailResponse } from "@/types/order.type";
import { MapPin, User, Phone } from "lucide-react";

type Props = {
  shipping: IOrderDetailResponse["shipping_info"];
};

const ShippingAddressCard: React.FC<Props> = ({ shipping }) => {
  return (
    <div className="bg-[var(--color-panel-elevated)] border border-[var(--color-panel-elevated-border)] rounded-xl p-5 sm:p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <MapPin className="text-[var(--color-primary)]" size={20} />
        Địa chỉ nhận hàng
      </h3>
      <div className="bg-[var(--color-panel-elevated-2)] p-4 rounded-lg flex flex-col gap-3">
        <div className="flex items-center gap-3 text-gray-300">
          <User size={16} className="text-gray-400" />
          <span className="font-medium text-white">{shipping.receiver_name || "Chưa cập nhật tên"}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-300">
          <Phone size={16} className="text-gray-400" />
          <span>{shipping.receiver_phone || "Chưa cập nhật SĐT"}</span>
        </div>
        <div className="flex items-start gap-3 text-gray-300 mt-1">
          <span className="text-gray-400 mt-1 min-w-[16px] text-center">•</span>
          <span className="leading-relaxed">{shipping.receiver_address || "Chưa cập nhật địa chỉ"}</span>
        </div>
      </div>
    </div>
  );
};
export default ShippingAddressCard;