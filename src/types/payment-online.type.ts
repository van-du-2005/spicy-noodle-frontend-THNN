// src/types/payment-online.type.ts
import { ONLINE_TRANSACTION_STATUS } from '@/constants';

export type PaymentOnlineStatus = typeof ONLINE_TRANSACTION_STATUS[keyof typeof ONLINE_TRANSACTION_STATUS];

export interface IPaymentOnline {
  payments_online_id: number;
  orders_id: number;
  transaction_code: string;
  payment_status: PaymentOnlineStatus;
  paid_at?: Date | null;
  created_at?: Date;
}