import type{ DisplayOrderStatus, InventoryOrderStatus } from "@/types/order/order.types";


export const inventoryStatusConfig: Record<InventoryOrderStatus, { label: string; badgeClass: string }> = {
  processing: { label: "Processing", badgeClass: "bg-status-inprogress-bg text-status-inprogress-text" },
  shipped: { label: "Shipped", badgeClass: "bg-brand-cta-soft text-brand-cta" },
  delivered: { label: "Delivered", badgeClass: "bg-status-approved-bg text-status-approved-text" },
  cancelled: { label: "Cancelled", badgeClass: "bg-status-rejected-bg text-status-rejected-text" },
};

// Explicit state machine — only these transitions are ever allowed
export const inventoryStatusTransitions: Record<InventoryOrderStatus, InventoryOrderStatus[]> = {
  processing: ["shipped", "cancelled"],
  shipped: ["delivered", "cancelled"],
  delivered: [],
  cancelled: [],
};

export const displayStatusConfig: Record<DisplayOrderStatus, { label: string; badgeClass: string }> = {
  pending: { label: "Pending", badgeClass: "bg-status-awaiting-bg text-status-awaiting-text" },
  processing: { label: "Processing", badgeClass: "bg-status-inprogress-bg text-status-inprogress-text" },
  delivered: { label: "Delivered", badgeClass: "bg-status-approved-bg text-status-approved-text" },
  cancelled: { label: "Cancelled", badgeClass: "bg-status-rejected-bg text-status-rejected-text" },
};

// UI-only relabel: a "delivered" row that was auto-completed by timeout, not vendor-confirmed
export const TIMEOUT_BADGE = { label: "Timed Out", badgeClass: "bg-status-neutral-bg text-status-neutral-text" };

export function getDisplayStatusDisplay(status: DisplayOrderStatus, completionReason: IDisplayOrderRowReason) {
  if (status === "delivered" && completionReason === "timeout") return TIMEOUT_BADGE;
  return displayStatusConfig[status];
}

type IDisplayOrderRowReason = "vendor_confirmed" | "timeout" | null;