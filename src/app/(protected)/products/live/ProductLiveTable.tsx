
"use client";

import { useState } from "react";
import Image from "next/image";
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
import ReusableTable, { IColumn } from "@/components/ReuseableTable";
import { IProductLiveRow } from "@/types/product/productLive.types";
import { getProductLiveActions } from "./productLiveAction";
import { formatOfferRemaining } from "@/lib/utilis/offerFormat";
import { liveStatusConfig } from "@/lib/constants/products/productliveStatusConfig";
import { stockStatusConfig } from "@/lib/constants/dashboard/statusBadge";
import { IVendorAction } from "../../vendors/vendorAction";

const columns: IColumn[] = [
  { id: "product", label: "Product" },
  { id: "productId", label: "ID" },
  { id: "stock", label: "Stock", align: "right" },
  { id: "stockStatus", label: "Stock Status", align: "center" },
  { id: "sales", label: "Sales", align: "right" },
  { id: "orders", label: "Orders", align: "right" },
  { id: "offer", label: "Offer" },
  { id: "live", label: "Live", align: "center" },
  { id: "type", label: "Type" },
  { id: "details", label: "Details", align: "center" },
  { id: "action", label: "Action", align: "right" },
];

interface ProductLiveTableProps {
  data: IProductLiveRow[];
  isLoading: boolean;
  onToggleLive: (id: string, next: "live" | "draft") => void;
  onGenerateQuotation: (vendorId:string,id: string) => void;
  onNotifyVendor: (id: string) => void;
}

export default function ProductLiveTable({
  data,
  isLoading,
  onToggleLive,
  onGenerateQuotation,
  onNotifyVendor,
}: ProductLiveTableProps) {
  const router = useRouter();
  const [pendingAction, setPendingAction] = useState<IVendorAction | null>(
    null,
  );
  const [isRunning, setIsRunning] = useState(false);

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

  function renderRow(product: IProductLiveRow) {
    const live = liveStatusConfig[product.liveStatus];
    const stock = product.stockStatus
      ? stockStatusConfig[product.stockStatus]
      : null;
    const actions = getProductLiveActions(product, {
      onToggleLive,
      onGenerateQuotation,
      onNotifyVendor,
    });
    const offerText = formatOfferRemaining(product.offerEndDate);

    return (
      <>
        <td className="px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm overflow-hidden bg-app-border shrink-0 relative">
              <Image
                src={product.image}
                alt={product.productName}
                fill
                className="object-cover"
              />
            </div>
            <span className="font-medium text-table-cell-text">
              {product.productName}
            </span>
          </div>
        </td>
        <td className="px-4 py-3 text-table-cell-text">{product.productId}</td>
        <td className="px-4 py-3 text-right text-table-cell-text">
          {product.totalStock}
        </td>
        <td className="px-4 py-3 text-center">
          {stock ? (
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${stock.badgeClass}`}
            >
              {stock.label}
            </span>
          ) : (
            <span className="text-xs text-app-muted-foreground">—</span>
          )}
        </td>
        <td className="px-4 py-3 text-right text-table-cell-text">
          {product.totalSales}
        </td>
        <td className="px-4 py-3 text-right text-table-cell-text">
          {product.totalOrders}
        </td>
        <td className="px-4 py-3 text-table-cell-text text-xs">
          {offerText ?? (
            <span className="text-app-muted-foreground">No active offer</span>
          )}
        </td>
        <td className="px-4 py-3 text-center">
          <span
            className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${live.badgeClass}`}
          >
            {live.label}
          </span>
        </td>
        <td className="px-4 py-3 text-table-cell-text capitalize">
          {product.type}
        </td>
        <td className="px-4 py-3 text-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/products/live/${product.productId}`);
            }}
            className="px-3 py-1.5 rounded-sm text-xs font-medium border border-green-500 text-green-600 bg-app-background transition-colors hover:bg-green-700 hover:text-white hover:border-green-700"
          >
            Details
          </button>
        </td>
        <td className="px-4 py-3 text-right space-x-3">
          {actions.map((action) => (
            <button
              key={action.actionName}
              onClick={(e) => {
                e.stopPropagation();
                if (action.confirmMessage) setPendingAction(action);
                else action.method();
              }}
              className={`text-xs font-medium  ${
                action.variant === "destructive"
                  ? "text-status-rejected-text px-3 py-1.5 rounded-sm text-xs font-semibold border border-destructive  bg-app-background transition-colors hover:bg-button-destructive-bg-hover hover:text-white "
                  : "px-3 py-1.5 rounded-sm text-xs font-semibold border border-green-500 text-green-600 bg-app-background transition-colors hover:bg-green-700 hover:text-white hover:border-green-700"
              }`}
            >
              {action.actionName}
            </button>
          ))}
        </td>
      </>
    );
  }

  return (
    <>
      <ReusableTable
        columns={columns}
        data={data}
        renderRow={renderRow}
        loading={isLoading}
        rowKey={(item) => item.productId}
        emptyMessage="No products found."
      />

      <AlertDialog
        open={!!pendingAction}
        onOpenChange={(open) => !open && setPendingAction(null)}
      >
        <AlertDialogContent className="rounded-sm bg-app-background border-app-border text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>{pendingAction?.actionName}</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingAction?.confirmMessage}
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
