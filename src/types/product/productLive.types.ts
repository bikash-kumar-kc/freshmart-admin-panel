// products/productLive.types.ts
export type ProductLiveStatus = "draft" | "live";
export type ProductStockStatus = "in_stock" | "low_stock" | "out_of_stock";
export type ProductLiveType = "inventory" | "display";
export type SalesSort = "high_to_low" | "low_to_high";

export interface IProductLiveRow {
  vendorId:string;
  productId: string;
  productName: string;
  image: string;
  type: ProductLiveType;
  liveStatus: ProductLiveStatus;
  stockStatus: ProductStockStatus | null; // null while draft — not applicable yet
  totalStock: number;
  totalSales: number;
  totalOrders: number;
  offerEndDate: string | null; // ISO string, null = no active offer
}

export interface IProductLiveFilters {
  stock: ProductStockStatus | "all";
  live: ProductLiveStatus | "all";
  type: ProductLiveType | "all";
}

export interface IProductLiveQuery extends IProductLiveFilters {
  search?: string; // product ID only
  page: number;
  pageSize: number;
}

export interface IProductLiveResponse {
  data: IProductLiveRow[];
  total: number;
  page: number;
  pageSize: number;
}