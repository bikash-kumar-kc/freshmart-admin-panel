import { IVendorListItem } from "@/types/vendors/vendorList.types";


export interface IVendorAction {
  actionName: string;
  confirmMessage?: string;
  variant?: "default" | "destructive";
  method: () => void | Promise<void>;
}

export function getVendorActions(
  vendor: IVendorListItem,
  handlers: { onApprove: (id: string) => void; onUnapprove: (id: string) => void; onDelete: (id: string) => void },
): IVendorAction[] {
  if (vendor.status === "unapproved") {
    return [
      {
        actionName: "Approve",
        confirmMessage: `Approve ${vendor.farmName}'s vendor application?`,
        method: () => handlers.onApprove(vendor.farmId),
      },
      {
        actionName: "Delete",
        confirmMessage: `Delete ${vendor.farmName}? This can be reversed only by manual restore.`,
        variant: "destructive",
        method: () => handlers.onDelete(vendor.farmId),
      },
    ];
  }

  if (vendor.status === "approved") {
    return [
      {
        actionName: "Unapprove",
        confirmMessage: `Revoke approval for ${vendor.farmName}? They will no longer be able to list products.`,
        method: () => handlers.onUnapprove(vendor.farmId),
      },
      {
        actionName: "Delete",
        confirmMessage: `Delete ${vendor.farmName}? This can be reversed only by manual restore.`,
        variant: "destructive",
        method: () => handlers.onDelete(vendor.farmId),
      },
    ];
  }

  return []; // deleted — terminal state, no actions
}