

import { VendorStatus } from "@/types/vendors/vendorList.types";


export const vendorStatusConfig: Record<
  VendorStatus,
  { label: string; badgeClass: string }
> = {
  approved: {
    label: "Approved",
    badgeClass: "bg-status-approved-bg text-status-approved-text",
  },
  unapproved: {
    label: "Unapproved",
    badgeClass: "bg-status-awaiting-bg text-status-awaiting-text",
  },
  deleted: {
    label: "Deleted",
    badgeClass: "bg-status-rejected-bg text-status-rejected-text",
  },
};
