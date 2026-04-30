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