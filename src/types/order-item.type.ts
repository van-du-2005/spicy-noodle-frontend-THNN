// src/types/order-item.type.ts

export interface IOrderItem {
  order_items_id: number;
  orders_id: number;
  products_id: number;
  quantity: number;
  spicy_level: number;
  price: number;
}