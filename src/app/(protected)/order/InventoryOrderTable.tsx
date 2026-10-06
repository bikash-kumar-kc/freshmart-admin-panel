// app/(protected)/order/InventoryOrderTable.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import ReuseableTable, { type IColumn } from "@/components/ReuseableTable";
import { inventoryStatusConfig, inventoryStatusTransitions } from "@/lib/constants/order/OrderStatusConfit";
import { useUpdateInventoryStatusMutation } from "@/lib/hooks/order/order.queries";
import { formatTimestamp } from "@/lib/utilis/timeFormatter";
import type { IInventoryOrderRow, InventoryOrderStatus } from "@/types/order/order.types";
import { appPrimaryColorOption } from "../vendors/VendorPageHeader";

const columns: IColumn[] = [
  { id: "orderId", label: "Order ID" },
  { id: "customer", label: "Customer" },
  { id: "totalItems", label: "Items", align: "right" },
  { id: "totalQuantity", label: "Qty", align: "right" },
  { id: "discount", label: "Discount", align: "right" },
  { id: "status", label: "Status", align: "center" },
  { id: "createdAt", label: "Order Date" },
  { id: "details", label: "Details", align: "center" },
  { id: "action", label: "Action", align: "right" },
];

export default function InventoryOrderTable({ data, isLoading }: { data: IInventoryOrderRow[]; isLoading: boolean }) {
  const router = useRouter();
  const [pending, setPending] = useState<{ orderId: string; nextStatus: InventoryOrderStatus } | null>(null);
  const updateStatusMutation = useUpdateInventoryStatusMutation();

  async function handleConfirm() {
    if (!pending) return;
    await updateStatusMutation.mutateAsync({ orderId: pending.orderId, status: pending.nextStatus });
    setPending(null);
  }

  function renderRow(order: IInventoryOrderRow) {
    const status = inventoryStatusConfig[order.status];
    const nextStatuses = inventoryStatusTransitions[order.status];

    return (
      <>
        <td className="px-4 py-3 text-table-cell-text">{order.orderId}</td>
        <td className="px-4 py-3 text-table-cell-text">{order.customerName}</td>
        <td className="px-4 py-3 text-right text-table-cell-text">{order.totalItems}</td>
        <td className="px-4 py-3 text-right text-table-cell-text">{order.totalQuantity}</td>
        <td className="px-4 py-3 text-right text-table-cell-text">
          {order.discount !== null ? `Rs ${order.discount}` : <span className="text-app-muted-foreground">No discount</span>}
        </td>
        <td className="px-4 py-3 text-center">
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${status.badgeClass}`}>{status.label}</span>
        </td>
        <td className="px-4 py-3 text-table-cell-text whitespace-nowrap text-xs">{formatTimestamp(order.createdAt)}</td>
        <td className="px-4 py-3 text-center">
          <button
            onClick={(e) => { e.stopPropagation(); router.push(`/order/inventory/${order.orderId}`); }}
            className="px-3 py-1.5 rounded-sm text-xs font-medium border border-green-500 text-app-foreground bg-app-background transition-colors hover:bg-green-700 hover:text-white hover:border-green-700"
          >
            View details
          </button>
        </td>
        <td className="px-4 py-3 text-right">
          {nextStatuses.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button onClick={(e) => e.stopPropagation()} className="p-1.5 rounded-sm hover:bg-app-background-hover text-app-foreground">
                  <MoreVertical size={16} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={appPrimaryColorOption}>
                {nextStatuses.map((next) => (
                  <DropdownMenuItem
                    key={next}
                    onClick={(e) => { e.stopPropagation(); setPending({ orderId: order.orderId, nextStatus: next }); }}
                    className={
                      next === "failed"
                        ? "text-status-rejected-text focus:bg-status-rejected-bg focus:text-status-rejected-text"
                        : "text-button-secondary-text focus:bg-app-background-hover focus:text-button-secondary-text"
                    }
                  >
                    Mark as {inventoryStatusConfig[next].label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </td>
      </>
    );
  }

  return (
    <>
      <ReuseableTable columns={columns} data={data} renderRow={renderRow} loading={isLoading} rowKey={(item) => item.orderId} emptyMessage="No orders found." />

      <AlertDialog open={!!pending} onOpenChange={(open) => !open && setPending(null)}>
        <AlertDialogContent className="rounded-sm bg-app-background border-app-border text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Update order status</AlertDialogTitle>
            <AlertDialogDescription>
              Mark {pending?.orderId} as {pending && inventoryStatusConfig[pending.nextStatus].label}?
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