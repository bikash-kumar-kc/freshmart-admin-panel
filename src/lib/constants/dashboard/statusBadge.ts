import { ProductStockStatus } from "@/types/dashboard/topProduct.types";


export const stockStatusConfig: Record<ProductStockStatus, { label: string; badgeClass: string }> = {
  in_stock: { label: "In Stock", badgeClass: "bg-status-approved-bg text-status-approved-text" },
  low_stock: { label: "Low Stock", badgeClass: "bg-status-awaiting-bg text-status-awaiting-text" },
  out_of_stock: { label: "Out of Stock", badgeClass: "bg-status-rejected-bg text-status-rejected-text" },
};

export function needsAction(status: ProductStockStatus) {
  return status === "low_stock" || status === "out_of_stock";
}