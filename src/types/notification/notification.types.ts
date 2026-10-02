// notifications/notificationList.types.ts
export type NotificationSubType =
  | "inventory_order"
  | "quotation_countered"
  | "quotation_approved"
  | "vendor_registration"
  | "productListed";

export type NotificationPillValue = "all" | "read" | "unread" | NotificationSubType;

export interface INotificationItem {
  id: string;
  subType: NotificationSubType;
  message: string;
  isRead: boolean;
  referenceType: "quotation" | "vendor" | "productListing" | null;
  referenceId: string | null;
  createdAt: string;
}

export interface INotificationQuery {
  pill: NotificationPillValue;
  page: number;
  pageSize: number;
}

export interface INotificationResponse {
  data: INotificationItem[];
  total: number;
  page: number;
  pageSize: number;
}