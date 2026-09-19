// products/ProductListingTable.tsx
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
import ReusableTable, { IColumn } from "@/components/ReuseableTable";
import { IProductListingRow } from "@/types/product/productListing/productlisting.types";
import { IVendorAction } from "@/app/(protected)/vendors/vendorAction";
import { productListingStatusConfig } from "@/lib/constants/products/productListingStatusConfig";
import { getProductListingActions } from "./productListingAction";
import { formatTimestamp } from "@/lib/utilis/timeFormatter";

const columns: IColumn[] = [
  { id: "productId", label: "ID" },
  { id: "farmName", label: "Farm Name" },
  { id: "productName", label: "Product" },
  { id: "type", label: "Type" },
  { id: "quantity", label: "Quantity", align: "right" },
  { id: "unitPrice", label: "Unit Price", align: "right" },
  { id: "createdAt", label: "Created At" },
  { id: "status", label: "Status", align: "center" },
  { id: "details", label: "Details", align: "center" },
  { id: "action", label: "Action", align: "right" },
];

interface ProductListingTableProps {
  data: IProductListingRow[];
  isLoading: boolean;
  onApprove: (id: string) => void;
  onGenerateQuotation: (id: string) => void;
  onNotifyVendor: (id: string) => void;
}

export default function ProductListingTable({
  data,
  isLoading,
  onApprove,
  onGenerateQuotation,
  onNotifyVendor,
}: ProductListingTableProps) {
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

  function renderRow(product: IProductListingRow) {
    const status = productListingStatusConfig[product.status];
    const actions = getProductListingActions(product, {
      onApprove,
      onGenerateQuotation,
      onNotifyVendor,
    });

    return (
      <>
        <td className="px-4 py-3 text-table-cell-text">{product.productId}</td>
        <td className="px-4 py-3 text-table-cell-text">{product.farmName}</td>
        <td className="px-4 py-3 text-table-cell-text font-medium">
          {product.productName}
        </td>
        <td className="px-4 py-3 text-table-cell-text capitalize">
          {product.type}
        </td>
        <td className="px-4 py-3 text-right text-table-cell-text">
          {product.quantity}
        </td>
        <td className="px-4 py-3 text-right text-table-cell-text">
          Rs {product.unitPrice}
        </td>
        <td className="px-4 py-3 text-table-cell-text whitespace-nowrap text-xs">
          {formatTimestamp(product.createdAt)}
        </td>
        <td className="px-4 py-3 text-center">
          <span
            className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${status.badgeClass}`}
          >
            {status.label}
          </span>
        </td>
        <td className="px-4 py-3 text-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/products/productListing/${product.productId}`);
            }}
            className="px-3 py-1.5 rounded-sm text-xs font-medium border border-green-500 text-green-600 bg-app-background transition-colors hover:bg-green-700 hover:text-white hover:border-green-700"
          >
            Details
          </button>
        </td>
        <td className="px-4 py-3 text-center">
          {actions.map((action) => (
            <button
              key={action.actionName}
              onClick={(e) => {
                e.stopPropagation();
                if (action.confirmMessage) setPendingAction(action);
                else action.method();
              }}
              className="px-3 py-1.5 rounded-sm text-xs font-semibold border border-green-500 text-green-600 bg-app-background transition-colors hover:bg-green-700 hover:text-white hover:border-green-700"
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
        <AlertDialogContent className="rounded-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>{pendingAction?.actionName}</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingAction?.confirmMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRunning}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} disabled={isRunning}>
              {isRunning ? "Please wait..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
