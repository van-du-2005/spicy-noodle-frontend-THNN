// src/types/cart-item.type.ts

export interface ICartItem {
  cart_items_id: number;
  products_id: number;
  user_id: number;
  spicy_level: number;
  quantity: number;
  created_at?: Date; // Do timestamps: true và underscored: true
}