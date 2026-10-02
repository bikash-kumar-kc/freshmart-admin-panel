import { NotificationPillValue } from "@/types/notification/notification.types";


export const notificationPills: { label: string; value: NotificationPillValue }[] = [
  { label: "All", value: "all" },
  { label: "Unread", value: "unread" },
  { label: "Read", value: "read" },
  { label: "Inventory Order", value: "inventory_order" },
  { label: "Quotation Countered", value: "quotation_countered" },
  { label: "Quotation Approved", value: "quotation_approved" },
  { label: "Vendor Registration", value: "vendor_registration" },
  { label: "Product Listed", value: "productListed" },
];