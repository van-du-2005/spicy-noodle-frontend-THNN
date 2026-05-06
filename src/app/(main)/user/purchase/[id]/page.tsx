// src/app/(main)/user/purchase/[id]/page.tsx
"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useOrderDetail } from "@/hooks/useOrderDetail";
import { Loader2, ArrowLeft, AlertTriangle } from "lucide-react";
import OrderStatusHeader from "@/components/user/order-detail/OrderStatusHeader";
import ShippingAddressCard from "@/components/user/order-detail/ShippingAddressCard";
import OrderItemList from "@/components/user/order-detail/OrderItemList";
import PaymentSummary from "@/components/user/order-detail/PaymentSummary";

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id as string;

  const { order, loading, error } = useOrderDetail(orderId);

  if (loading) {
    return (
      <div className="w-full min-h-[500px] flex justify-center items-center">
        <Loader2 className="animate-spin text-[var(--color-primary)]" size={40} />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="w-full min-h-[400px] flex flex-col justify-center items-center text-center gap-4">
        <AlertTriangle size={64} className="text-red-500" />
        <h2 className="text-xl font-bold text-white">Rất tiếc!</h2>
        <p className="text-gray-400">{error || "Không tìm thấy dữ liệu đơn hàng."}</p>
        <button onClick={() => router.push("/user/purchase")} className="mt-4 px-6 py-2 bg-[var(--color-panel-elevated-2)] hover:bg-[var(--color-panel-elevated-hover)] text-white rounded-lg transition-colors">
          Quay lại danh sách
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      {/* Nút Back */}
      <button 
        onClick={() => router.back()} 
        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit"
      >
        <ArrowLeft size={20} />
        <span>Quay lại đơn hàng</span>
      </button>

      {/* Xếp khối (Layout Stack) */}
      <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto pb-10">
        <OrderStatusHeader info={order.order_info} />
        <ShippingAddressCard shipping={order.shipping_info} />
        <OrderItemList items={order.items} orderId={order.order_info.orders_id} />
        <PaymentSummary summary={order.payment_summary} info={order.order_info} />
      </div>
    </div>
  );
}