export type ProductStockStatus = "in_stock" | "low_stock" | "out_of_stock";
export type ProductSourceType = "inventory" | "display";
export type TopProductsPeriod = "week" | "month";

export interface ITopProduct {
  vendorId:string;
  id: string;
  productId: string; // human-readable ID shown in the table, e.g. "WSS-3345"
  name: string;
  image: string;
  type: ProductSourceType;
  sales: number;
  earning: number;
  stock: number;
  status: ProductStockStatus;
}