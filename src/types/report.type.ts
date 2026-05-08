// src/types/report.type.ts

export interface IRevenue {
  today: number;
  this_month: number;
  this_year: number;
}

export interface IOrderCounts {
  dang_xu_ly: number;
  dang_giao: number;
  da_giao: number;
  da_huy: number;
}

export interface IOverviewData {
  revenue: IRevenue;
  order_counts: IOrderCounts;
}

export interface ITopProduct {
  products_id: number;
  product_name: string;
  total_sold: number;
  image_url: string;
}

export interface ILowStockItem {
  products_id: number;
  product_name: string;
  stock_quantity: number;
  image_url: string;
}

export interface ILowStockResponse {
  items: ILowStockItem[];
  total_count: number;
  current_page: number;
  has_more: boolean;
}