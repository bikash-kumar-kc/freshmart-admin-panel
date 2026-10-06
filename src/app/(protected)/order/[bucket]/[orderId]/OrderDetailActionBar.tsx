// app/(protected)/order/[bucket]/[orderId]/OrderDetailActionBar.tsx
"use client";

import { useState } from "react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/components/ui/alert-dialog";
import { inventoryStatusConfig, inventoryStatusTransitions } from "@/lib/constants/order/OrderStatusConfit";
import { useUpdateInventoryStatusMutation } from "@/lib/hooks/order/order.queries";
import type { IOrderDetail } from "@/types/order/orderDetail.types";
import type { InventoryOrderStatus } from "@/types/order/order.types";

export function OrderDetailsActionBar({ order }: { order: IOrderDetail }) {
  const [pending, setPending] = useState<InventoryOrderStatus | null>(null);
  const updateStatusMutation = useUpdateInventoryStatusMutation();

  if (order.type !== "inventory") return null; // display orders stay read-only


  const nextStatuses = inventoryStatusTransitions[order.orderStatus as InventoryOrderStatus];
  if (nextStatuses.length === 0) return null;

  async function handleConfirm() {
    if (!pending) return;
    await updateStatusMutation.mutateAsync({ orderId: order.orderId, status: pending });
    setPending(null);
  }

  return (
    <>
      <div className="flex justify-end gap-2">
        {nextStatuses.map((next) => (
          <button
            key={next}
            onClick={() => setPending(next)}
            className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
              next === "failed"
                ? "border border-status-rejected-text text-status-rejected-text hover:bg-status-rejected-bg"
                : "bg-brand-primary text-white hover:bg-brand-primary/90"
            }`}
          >
            Mark as {inventoryStatusConfig[next].label}
          </button>
        ))}
      </div>

      <AlertDialog open={!!pending} onOpenChange={(open) => !open && setPending(null)}>
        <AlertDialogContent className="rounded-sm bg-app-background border-app-border text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Update order status</AlertDialogTitle>
            <AlertDialogDescription>
              Mark {order.orderId} as {pending && inventoryStatusConfig[pending].label}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="bg-app-background border-app-border text-app-foreground">
            <AlertDialogCancel
              disabled={updateStatusMutation.isPending}
              className="bg-app-background border-app-border outline-0 hover:bg-app-background-hover transition-colors"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              disabled={updateStatusMutation.isPending}
              className="bg-button-primary-bg hover:bg-button-primary-bg-hover"
            >
              {updateStatusMutation.isPending ? "Please wait..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}