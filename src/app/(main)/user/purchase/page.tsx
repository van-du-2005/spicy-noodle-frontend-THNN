// src/app/(main)/user/purchase/page.tsx

 "use client";
import React from "react";
import OrderList from "@/components/user/OrderList";


// Trang này chạy trên Server (hoặc bọc "use client" bên trong Component con)
export default function PurchasePage() {
  return (
    <div className="purchase-page w-full min-h-full">
      <OrderList />
    </div>
  );
}