import { IVendorDetail } from "@/types/vendors/vendorDetails.types";
import { IVendorAction } from "../vendorAction";


export function getVendorDetailActions(
  vendor: IVendorDetail,
  handlers: { onApprove: () => void; onUnapprove: () => void; onDelete: () => void },
): IVendorAction[] {
  if (vendor.status === "unapproved") {
    return [
      {
        actionName: "Approve",
        confirmMessage: `Approve ${vendor.farmName}'s vendor application?`,
        method: handlers.onApprove,
      },
      {
        actionName: "Delete",
        confirmMessage: `Delete ${vendor.farmName}? This can be reversed only by manual restore.`,
        variant: "destructive",
        method: handlers.onDelete,
      },
    ];
  }

  if (vendor.status === "approved") {
    return [
      {
        actionName: "Unapprove",
        confirmMessage: `Revoke approval for ${vendor.farmName}? They will no longer be able to list products.`,
        method: handlers.onUnapprove,
      },
      {
        actionName: "Delete",
        confirmMessage: `Delete ${vendor.farmName}? This can be reversed only by manual restore.`,
        variant: "destructive",
        method: handlers.onDelete,
      },
    ];
  }

  return [];
}