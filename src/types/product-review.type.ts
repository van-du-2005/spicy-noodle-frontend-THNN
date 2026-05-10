// src/types/product-review.type.ts

export interface IProductReview {
  product_reviews_id: number;
  user_id: number;
  products_id: number;
  orders_id: number;
  rating: number;
  comment: string;
  is_approved: boolean;
  created_at?: Date; // timestamps: true
}