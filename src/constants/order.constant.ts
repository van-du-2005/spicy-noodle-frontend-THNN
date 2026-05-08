// src/constants/order.constant.ts

export const ORDER_STATUS = {
  PENDING: 'dang_xu_ly',
  SHIPPING: 'dang_giao',
  DELIVERED: 'da_giao',
  CANCELLED: 'da_huy',
} as const;

export const PAYMENT_METHOD = {
  ONLINE: 'online',
  COD: 'COD',
} as const;

export const PAYMENT_STATUS = {
  UNPAID: 'chua_thanh_toan',
  PAID: 'da_thanh_toan',
} as const;

export const ONLINE_TRANSACTION_STATUS = {
  PENDING: 'dang_chuyen',
  FAILED: 'that_bai',
  SUCCESS: 'thanh_cong',
  REFUNDED: 'hoan_tien_lai',
} as const;


// Bộ từ điển để map UI (Màu sắc và Tiếng Việt)
export const ORDER_STATUS_DETAILS = {
  [ORDER_STATUS.PENDING]: { label: 'Đang xử lý', color: 'text-[#ff5a1f]', bg: 'bg-[#ff5a1f]/10' },
  [ORDER_STATUS.SHIPPING]: { label: 'Đang giao', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  [ORDER_STATUS.DELIVERED]: { label: 'Đã giao', color: 'text-green-500', bg: 'bg-green-500/10' },
  [ORDER_STATUS.CANCELLED]: { label: 'Đã hủy', color: 'text-red-500', bg: 'bg-red-500/10' },
} as const;

// Map key từ OrderTabs (Frontend) sang OrderStatus (Backend)
export const TAB_TO_STATUS_MAP: Record<string, string> = {
  processing: ORDER_STATUS.PENDING,
  shipping: ORDER_STATUS.SHIPPING,
  delivered: ORDER_STATUS.DELIVERED,
  cancelled: ORDER_STATUS.CANCELLED,
};