// src/types/product.type.ts

export interface IProduct {
  products_id: number;
  product_categories_id: number;
  name: string;
  price: number;
  max_spicy_level: number;
  stock_quantity: number;
  is_active: boolean;
  short_description?: string | null;
  is_best_seller: boolean;
  is_combo: boolean;
  average_rating?: number | null;
  rating_count: number;
}