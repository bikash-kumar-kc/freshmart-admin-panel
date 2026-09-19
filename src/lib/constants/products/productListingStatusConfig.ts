import { ProductListingStatus } from "@/types/product/productListing/productlisting.types";


export const productListingStatusConfig: Record<ProductListingStatus, { label: string; badgeClass: string }> = {
  approved: { label: "Approved", badgeClass: "bg-status-approved-bg text-status-approved-text" },
  unapproved: { label: "Unapproved", badgeClass: "bg-status-awaiting-bg text-status-awaiting-text" },
};