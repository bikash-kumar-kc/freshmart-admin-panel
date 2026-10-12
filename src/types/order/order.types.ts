import { IDisplayOrderRowReason } from "@/lib/constants/order/OrderStatusConfit";

// types/order/order.types.ts
export type InventoryOrderStatus =
  | "packaging"
  | "ontheway"
  | "delivered"
  | "failed";
export type DisplayOrderStatus =
  | "pending"
  | "processing"
  | "delivered"
  | "cancelled";

export interface IInventoryOrderRow {
  orderId: string;
  customerName: string;
  totalItems: number;
  totalQuantity: number;
  discount: number | null;
  status: InventoryOrderStatus;
  createdAt: string;
}

export interface IDisplayOrderRow {
  orderId: string;
  customerName: string;
  farmName: string | null;
  totalItems: number;
  totalQuantity: number;
  status: DisplayOrderStatus;
  confirmationDeadline: string | null;
  createdAt: string;
  completionReason?:IDisplayOrderRowReason;
}

export interface IOrderListQuery {
  bucket:string;
  status: string;
  search?: string;
  page: number;
  pageSize: number;
}

export interface IOrderListResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export type OrderBucket = "inventory" | "display";
