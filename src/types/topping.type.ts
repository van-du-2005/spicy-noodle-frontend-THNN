// src/types/topping.type.ts

export interface ITopping {
  toppings_id: number;
  products_id: number;
  name: string;
  price: number;
  is_active: boolean;
}