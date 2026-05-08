// src/components/admin/dashboard/TopSellingProducts.tsx
import React from "react";
import Image from "next/image";
import { ITopProduct } from "@/types/report.type";
import { Trophy } from "lucide-react";

export const TopSellingProducts: React.FC<{ products: ITopProduct[] }> = ({ products }) => {
  return (
    <div className="bg-[var(--color-panel-elevated)] border border-[var(--color-panel-elevated-border)] p-6 rounded-2xl flex flex-col h-full">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Trophy className="text-yellow-500" size={20} /> Top 5 Bán Chạy
      </h3>
      <ul className="flex flex-col flex-1">
        {products.map((item, idx) => (
          <li key={item.products_id} className="flex items-center gap-4 py-3 border-b border-gray-800 last:border-0">
            <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${idx < 3 ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white'}`}>
              {idx + 1}
            </span>
            <Image src={item.image_url || "/anh_mi_mac_dinh.png"} alt={item.product_name} width={48} height={48} className="rounded-lg object-cover bg-gray-800 shrink-0" unoptimized />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{item.product_name}</p>
              <p className="text-xs text-gray-400 mt-0.5">Đã bán: <span className="text-[var(--color-primary)] font-bold">{item.total_sold}</span></p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};