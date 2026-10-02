
import { NotificationSubType } from "@/types/notification/notification.types";
import { Package, FileSpreadsheet, CheckCircle2, UserPlus, Tag, type LucideIcon } from "lucide-react";


export const notificationSubTypeConfig: Record<NotificationSubType, { label: string; icon: LucideIcon; iconBg: string; iconColor: string }> = {
  inventory_order: { label: "Inventory Order", icon: Package, iconBg: "var(--status-inprogress-bg)", iconColor: "var(--status-inprogress-text)" },
  quotation_countered: { label: "Quotation Countered", icon: FileSpreadsheet, iconBg: "var(--brand-cta-soft)", iconColor: "var(--brand-cta)" },
  quotation_approved: { label: "Quotation Approved", icon: CheckCircle2, iconBg: "var(--status-approved-bg)", iconColor: "var(--status-approved-text)" },
  vendor_registration: { label: "Vendor Registration", icon: UserPlus, iconBg: "var(--brand-primary-soft)", iconColor: "var(--status-neutral-text)" },
  productListed: { label: "Product Listed", icon: Tag, iconBg: "var(--status-neutral-bg)", iconColor: "var(--status-neutral-text)" },
};