// vendors/VendorProfileSection.tsx
"use client";

import { useState } from "react";
import { MoreVertical, Pencil } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/components/ui/alert-dialog";
import { IVendorDetail } from "@/types/vendors/vendorDetails.types";
import { IVendorAction } from "../vendorAction";
import { vendorStatusConfig } from "@/lib/constants/vendors/vendorStatusConfig";
import { getVendorDetailActions } from "./VendorAction";
import { appPrimaryColorOption } from "../VendorPageHeader";

interface VendorProfileSectionProps {
  vendor: IVendorDetail;
  onApprove: () => void;
  onUnapprove: () => void;
  onDelete: () => void;
}

export function VendorProfileSection({
  vendor,
  onApprove,
  onUnapprove,
  onDelete,
}: VendorProfileSectionProps) {
  const [pendingAction, setPendingAction] = useState<IVendorAction | null>(
    null,
  );
  const [isRunning, setIsRunning] = useState(false);

  const status = vendorStatusConfig[vendor.status];
  const actions = getVendorDetailActions(vendor, {
    onApprove,
    onUnapprove,
    onDelete,
  });

  async function handleConfirm() {
    if (!pendingAction) return;
    setIsRunning(true);
    try {
      await pendingAction.method();
    } finally {
      setIsRunning(false);
      setPendingAction(null);
    }
  }

  return (
    <div className="bg-statcard-background border border-statcard-border rounded-sm overflow-hidden">
      <div className="h-24 bg-linear-to-r from-brand-primary-soft to-brand-cta-soft" />

      <div className="px-5 pb-5">
        <div className="flex items-end justify-between -mt-10">
          <div className="w-20 h-20 rounded-full border-4 border-statcard-background overflow-hidden bg-app-border relative shrink-0">
            {/* <Image
              src={vendor.vendorImage}
              alt={vendor.farmOwner}
              fill
              className="object-cover"
            /> */}

            <div className="w-20 h-20 rounded-full border-4 border-statcard-background bg-brand-primary-soft text-brand-primary flex items-center justify-center text-2xl font-semibold shrink-0">
              {vendor.farmOwner?.[0]?.toUpperCase() ?? "V"}
            </div>
          </div>

          {vendor.status === "approved" && (
            <div className="flex items-center gap-2 mt-10">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium border border-app-border text-app-foreground hover:bg-menu-item-hover-bg transition-colors">
                <Pencil size={13} />
                Edit Profile
              </button>

              {actions.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded-sm border border-app-border hover:bg-menu-item-hover-bg text-app-foreground">
                      <MoreVertical size={14} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className={appPrimaryColorOption}
                  >
                    {actions.map((action) => (
                      <DropdownMenuItem
                        key={action.actionName}
                        onClick={() =>
                          action.confirmMessage
                            ? setPendingAction(action)
                            : action.method()
                        }
                        className={
                          action.variant === "destructive"
                            ? "text-status-rejected-text focus:bg-status-rejected-bg focus:text-status-rejected-text"
                            : "text-button-secondary-text focus:bg-[#262626] transition-colors focus:text-app-foreground"
                        }
                      >
                        {action.actionName}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mt-3">
          <h2 className="text-lg font-semibold text-app-foreground">
            {vendor.farmOwner}
          </h2>
          <span
            className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${status.badgeClass}`}
          >
            {status.label}
          </span>
        </div>
      </div>

      <AlertDialog
        open={!!pendingAction}
        onOpenChange={(open) => !open && setPendingAction(null)}
      >
        <AlertDialogContent className={appPrimaryColorOption + "rounded-sm"}>
          <AlertDialogHeader>
            <AlertDialogTitle>{pendingAction?.actionName}</AlertDialogTitle>
            <AlertDialogDescription className="hover:text-app-foreground transition-colors">
              {pendingAction?.confirmMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className={appPrimaryColorOption}>
            <AlertDialogCancel
              disabled={isRunning}
              className="bg-app-background border-app-border outline-0 hover:bg-[#262626] transition-colors"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              disabled={isRunning}
              className={
                pendingAction?.variant === "destructive"
                  ? "bg-button-destructive-bg hover:bg-button-destructive-bg-hover text-button-destructive-text"
                  : "bg-button-primary-bg hover:bg-button-primary-bg-hover"
              }
            >
              {isRunning ? "Please wait..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
