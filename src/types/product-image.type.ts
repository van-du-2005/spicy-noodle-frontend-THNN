// src/types/product-image.type.ts

export interface IProductImage {
  product_images_id: number;
  products_id: number;
  image_url?: string | null;
  display_order: number;
}