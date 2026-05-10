// src/types/voucher.type.ts
import { DISCOUNT_TYPE } from '@/constants';

export type DiscountType = typeof DISCOUNT_TYPE[keyof typeof DISCOUNT_TYPE];

export interface IVoucher {
  vouchers_id: number;
  code: string;
  discount_value: number;
  discount_type: DiscountType;
  minimum_order_value: number;
  maximum_discount_amount: number;
  usage_limit: number;
  used_count: number;
  start_at: Date;
  end_at: Date;
  is_active: boolean;
  description?: string | null;
}