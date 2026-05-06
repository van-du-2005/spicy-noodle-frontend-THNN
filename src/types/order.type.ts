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

//Interface dành riêng cho API danh sách đơn hàng
export interface IOrderSummary {
  orders_id: number;
  createdAt: string;
  total_amount: string | number;
  order_status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod;
  representative_name: string;
  representative_image: string;
  total_items_count: number;
}

// Thêm các Interface cho trang chi tiết đơn hàng
// start
export interface IOrderDetailTopping {
  topping_name: string;
  quantity: number;
  price: number;
}

export interface IOrderDetailItem {
  order_items_id: number;
  product_name: string;
  is_combo: boolean;
  image_url: string;
  quantity: number;
  price: number;
  spicy_level: number;
  toppings: IOrderDetailTopping[];
}

export interface IOrderDetailResponse {
  order_info: {
    orders_id: number;
    createdAt: string;
    order_status: OrderStatus;
    payment_status: PaymentStatus;
    payment_method: PaymentMethod;
  };
  shipping_info: {
    receiver_name: string;
    receiver_phone: string;
    receiver_address: string;
  };
  items: IOrderDetailItem[];
  payment_summary: {
    subtotal_amount: number;
    discount_amount: number;
    total_amount: number;
  };
  online_transaction: {
    transaction_code: string;
    paid_at: string | null;
  } | null;
}
// end

// Định nghĩa cho thành phần của Combo
//start
export interface IComboComponentDetail {
  component_name: string;
  quantity_per_combo: number;
  component_image: string;
}

// Định nghĩa dữ liệu trả về của API Combo Detail
export interface IComboDetailResponse {
  combo_components: IComboComponentDetail[];
  extra_toppings: IOrderDetailTopping[]; 
  item_subtotal: number;
}
// end