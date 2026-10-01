import { QuotationPrimaryBucket, QuotationSubStatus } from "@/types/quotation/quotation.types";


export const quotationStatusConfig: Record<Exclude<QuotationSubStatus, "all">, { label: string; badgeClass: string }> = {
  approved: { label: "Approved", badgeClass: "bg-status-approved-bg text-status-approved-text" },
  delivered: { label: "Delivered", badgeClass: "bg-status-approved-bg text-status-approved-text" },
  pending: { label: "Pending", badgeClass: "bg-status-awaiting-bg text-status-awaiting-text" },
  cancelled: { label: "Cancelled", badgeClass: "bg-status-rejected-bg text-status-rejected-text" },
  rechecking: { label: "Rechecking", badgeClass: "bg-status-inprogress-bg text-status-inprogress-text" },
  countered: { label: "Countered", badgeClass: "bg-status-inprogress-bg text-status-inprogress-text" },
};

export const subStatusOptionsByBucket: Record<QuotationPrimaryBucket, { label: string; value: QuotationSubStatus }[]> = {
  approved: [
    { label: "All status", value: "all" },
    { label: "Approved", value: "approved" },
    { label: "Delivered", value: "delivered" },
  ],
  unapproved: [
    { label: "All status", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Rechecking", value: "rechecking" },
    { label: "Countered", value: "countered" },
  ],
};