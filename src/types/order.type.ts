// src/types/order.type.ts
import { ORDER_STATUS, PAYMENT_METHOD, PAYMENT_STATUS } from '@/constants';

export type OrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];
export type PaymentMethod = typeof PAYMENT_METHOD[keyof typeof PAYMENT_METHOD];
export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];


export interface IOrder {
  orders_id: number; // BIGINT trong DB, về TS dùng number (hoặc string nếu số quá lớn)
  users_id: number;
  discount_amount: number;
  total_amount: number;
  order_status: OrderStatus;
  receiver_name: string;
  receiver_phone: string;
  receiver_address: string;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  created_at?: Date;
}