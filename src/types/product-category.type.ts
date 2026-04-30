// src/types/product-category.type.ts

export interface IProductCategory {
  product_categories_id: number;
  name: string;
  is_active: boolean;
  created_at?: Date; // timestamps: true
}
