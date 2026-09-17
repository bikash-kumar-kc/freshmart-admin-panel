// vendors/VendorBottomActionBar.tsx
"use client";

import { useState } from "react";
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
import { getVendorDetailActions } from "./VendorAction";


interface VendorBottomActionBarProps {
  vendor: IVendorDetail;
  onApprove: () => void;
  onDelete: () => void;
}

export function VendorBottomActionBar({ vendor, onApprove, onDelete }: VendorBottomActionBarProps) {
  const [pendingAction, setPendingAction] = useState<IVendorAction | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  if (vendor.status !== "unapproved") return null;

  const actions = getVendorDetailActions(vendor, { onApprove, onUnapprove: () => {}, onDelete });

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
    <div className="flex justify-end gap-2">
      {actions.map((action) => (
        <button
          key={action.actionName}
          onClick={() => setPendingAction(action)}
          className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
            action.variant === "destructive"
              ? "text-status-rejected-text hover:bg-status-rejected-bg border border-status-rejected-text"
              : "bg-brand-primary text-white hover:bg-brand-primary/90"
          }`}
        >
          {action.actionName}
        </button>
      ))}

      <AlertDialog open={!!pendingAction} onOpenChange={(open) => !open && setPendingAction(null)}>
        <AlertDialogContent className="rounded-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>{pendingAction?.actionName}</AlertDialogTitle>
            <AlertDialogDescription>{pendingAction?.confirmMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRunning}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              disabled={isRunning}
              className={
                pendingAction?.variant === "destructive"
                  ? "bg-button-destructive-bg hover:bg-button-destructive-bg-hover text-button-destructive-text"
                  : ""
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