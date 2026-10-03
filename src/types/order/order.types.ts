
export type OrderBucket = "inventory" | "display";
export type InventoryOrderStatus = "processing" | "shipped" | "delivered" | "cancelled";
export type DisplayOrderStatus = "pending" | "processing" | "delivered" | "cancelled";
export type PaymentMethod = "stripe" | "khalti" | "esewa";
export type DisplayCompletionReason = "vendor_confirmed" | "timeout" | null;

export interface IInventoryOrderRow {
  orderId: string;
  customerName: string;
  totalItems: number;
  totalQuantity: number;
  discount: number | null;
  paymentMethod: PaymentMethod;
  status: InventoryOrderStatus;
  orderDate: string;
  deliveryDate: string | null;
}

export interface IDisplayOrderRow {
  orderId: string;
  customerName: string;
  farmName: string;
  totalItems: number;
  totalQuantity: number;
  status: DisplayOrderStatus;
  completionReason: DisplayCompletionReason;
  confirmationDeadline: string;
  orderDate: string;
}

export interface IOrderListQuery {
  bucket: OrderBucket;
  status: string; // scoped status value, "all" included
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