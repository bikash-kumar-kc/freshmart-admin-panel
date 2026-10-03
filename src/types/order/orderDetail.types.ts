import {
  DisplayCompletionReason,
  DisplayOrderStatus,
  InventoryOrderStatus,
  OrderBucket,
  PaymentMethod,
} from "./order.types";

export interface IOrderItemDetail {
  productId: string;
  productName: string; // includes size+unit, e.g. "Apple (500g)"
  image: string;
  quantity: number;
  amount: number; // line total for this item
  discount: number | null;
}

export interface ICustomerInfo {
  customerId: string;
  customerName: string;
  address: string;
  email: string;
  phone: string;
}

export interface IOrderDetail {
  orderId: string;
  type: OrderBucket;
  status: InventoryOrderStatus | DisplayOrderStatus;
  completionReason?: DisplayCompletionReason; // display only
  totalItems: number;
  totalQuantity: number;
  totalAmount: number;
  totalDiscount: number | null;
  placedDate: string;

  // inventory-only
  paymentMethod?: PaymentMethod;
  deliveryAddress?: string;
  expectedDate?: string | null;

  // display-only
  farmName?: string;
  confirmationDeadline?: string;

  items: IOrderItemDetail[];
  customer: ICustomerInfo;
}
