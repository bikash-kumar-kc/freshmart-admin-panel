// quotation/QuotationDetailActionBar.tsx
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
import type { IQuotationDetail } from "@/types/quotation/quotationDetails.types";

interface QuotationDetailActionBarProps {
  quotation: IQuotationDetail;
  onCancel: () => void;
  onApprove: () => void;
}

export function QuotationDetailActionBar({
  quotation,
  onCancel,
  onApprove,
}: QuotationDetailActionBarProps) {
  const [pending, setPending] = useState<"cancel" | "approve" | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const showCancel =
    quotation.status === "pending" ||
    quotation.status === "rechecking" ||
    quotation.status === "countered";
  const showApprove =
    quotation.status === "rechecking" || quotation.status === "countered";

  if (!showCancel && !showApprove) return null; // approved, delivered, cancelled — no actions

  async function handleConfirm() {
    if (!pending) return;
    setIsRunning(true);
    try {
      if (pending === "cancel") await onCancel();
      else await onApprove();
    } finally {
      setIsRunning(false);
      setPending(null);
    }
  }

  const approveMessage =
    quotation.status === "countered"
      ? "Approve this quotation at the vendor's countered price?"
      : "Approve this quotation at the originally suggested price?";

  return (
    <>
      <div className="flex justify-end gap-2">
        {showCancel && (
          <button
            onClick={() => setPending("cancel")}
            className="px-4 py-2 rounded-sm text-sm font-medium border border-status-rejected-text text-status-rejected-text hover:bg-status-rejected-bg transition-colors"
          >
            Cancel Quotation
          </button>
        )}
        {showApprove && (
          <button
            onClick={() => setPending("approve")}
            className="px-4 py-2 rounded-sm text-sm font-medium bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors"
          >
            Approve
          </button>
        )}
      </div>

      <AlertDialog
        open={!!pending}
        onOpenChange={(open) => !open && setPending(null)}
      >
        <AlertDialogContent className="rounded-sm bg-app-background border-app-border text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pending === "cancel" ? "Cancel Quotation" : "Approve Quotation"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pending === "cancel"
                ? `Cancel quotation ${quotation.quotationId}?`
                : approveMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="bg-app-background border-app-border text-app-foreground">
            <AlertDialogCancel
              disabled={isRunning}
              className="bg-app-background border-app-border outline-0 hover:bg-app-background-hover transition-colors"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              disabled={isRunning}
              className="bg-button-primary-bg hover:bg-button-primary-bg-hover"
            >
              {isRunning ? "Please wait..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
