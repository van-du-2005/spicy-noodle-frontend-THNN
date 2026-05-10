// src/components/admin/dashboard/LowStockWarning.tsx
import React from "react";
import Image from "next/image";
import { ILowStockItem } from "@/types/report.type";
import { AlertTriangle, Loader2 } from "lucide-react";

type Props = {
  items: ILowStockItem[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
};

export const LowStockWarning: React.FC<Props> = ({ items, loading, hasMore, onLoadMore }) => {
  return (
    <div className="bg-[var(--color-panel-elevated)] border border-[var(--color-panel-elevated-border)] p-6 rounded-2xl">
      <h3 className="text-lg font-bold text-red-500 mb-4 flex items-center gap-2">
        <AlertTriangle size={20} /> Cảnh báo sắp hết hàng ({items.length})
      </h3>
      
      {items.length === 0 && !loading ? (
        <p className="text-sm text-gray-400 py-4 text-center">Mọi sản phẩm đều còn đủ hàng hóa.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.products_id} className="flex items-center gap-3 p-3 bg-red-500/5 border border-red-500/20 rounded-xl transition-colors hover:bg-red-500/10">
              <Image src={item.image_url || "/anh_mi_mac_dinh.png"} alt={item.product_name} width={40} height={40} className="rounded object-cover bg-gray-800 shrink-0" unoptimized />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{item.product_name}</p>
                <p className="text-xs text-red-400 mt-0.5 font-semibold">Tồn kho: {item.stock_quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {hasMore && (
        <button
          onClick={onLoadMore}
          disabled={loading}
          className="mt-6 w-full py-2.5 rounded-xl border border-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
        >
          {loading ? <Loader2 className="animate-spin text-[var(--color-primary)]" size={18} /> : "Tải thêm sản phẩm"}
        </button>
      )}
    </div>
  );
};