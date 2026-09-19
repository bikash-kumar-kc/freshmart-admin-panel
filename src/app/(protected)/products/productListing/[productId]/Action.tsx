// products/ProductBottomActionBar.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { IProductListingDetail } from "@/types/product/productListing/productListingDetail.types";

interface ProductBottomActionBarProps {
  product: IProductListingDetail;
  onApprove: () => void;
  onNotifyVendor: () => void;
}

export function ProductBottomActionBar({
  product,
  onApprove,
  onNotifyVendor,
}: ProductBottomActionBarProps) {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  async function handleConfirm(action: () => void | Promise<void>) {
    setIsRunning(true);
    try {
      await action();
    } finally {
      setIsRunning(false);
      setConfirmOpen(false);
    }
  }

  if (product.status === "unapproved") {
    return (
      <>
        <div className="flex justify-end">
          <button
            onClick={() => setConfirmOpen(true)}
            className="px-4 py-2 rounded-sm text-sm font-medium bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors"
          >
            Approve
          </button>
        </div>

        <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <AlertDialogContent className="rounded-sm bg-app-background border-app-border text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Approve product</AlertDialogTitle>
              <AlertDialogDescription className="hover:text-app-foreground">
                Approve &quot;{product.localName}&quot; from {product.farmName}?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className=" bg-app-background border-app-border text-app-foreground">
              <AlertDialogCancel
                disabled={isRunning}
                className="bg-app-background border-app-border outline-0 hover:bg-[#262626] transition-colors"
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleConfirm(onApprove)}
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

  // approved
  if (product.type === "inventory") {
    return (
      <div className="flex justify-end">
        <button
          onClick={() =>
            router.push(`/quotation/create?productId=${product.productId}`)
          }
          className="px-4 py-2 rounded-sm text-sm font-medium bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors"
        >
          Generate quotation
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={() => setConfirmOpen(true)}
          className="px-4 py-2 rounded-sm text-sm font-medium bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors"
        >
          Notify vendor
        </button>
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent className="rounded-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Notify vendor</AlertDialogTitle>
            <AlertDialogDescription>
              Send a notification to {product.farmName} to update stock for
              &quot;{product.localName}&quot;?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRunning}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleConfirm(onNotifyVendor)}
              disabled={isRunning}
            >
              {isRunning ? "Please wait..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
