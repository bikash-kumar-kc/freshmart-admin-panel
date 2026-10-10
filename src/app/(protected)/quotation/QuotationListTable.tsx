// quotation/QuotationListTable.tsx
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import ReusableTable, { IColumn } from "@/components/ReuseableTable";
import { IQuotationListRow } from "@/types/quotation/quotation.types";
import { IVendorAction } from "../vendors/vendorAction";
import { quotationStatusConfig } from "@/lib/constants/quotation/quotationStatus";
import { formatTimestamp } from "@/lib/utilis/timeFormatter";
import { getQuotationListActions } from "@/lib/constants/quotation/quotationListAction";
import { appPrimaryColorOption } from "../vendors/VendorPageHeader";

const columns: IColumn[] = [
  { id: "quotationId", label: "Quotation ID" },
  { id: "farmName", label: "Farm Name" },
  { id: "productName", label: "Product" },
  { id: "status", label: "Status", align: "center" },
  { id: "requestedBy", label: "Requested By" },
  { id: "createdBy", label: "Created By" },
  { id: "createdAt", label: "Created At" },
  { id: "details", label: "Details", align: "center" },
  { id: "action", label: "Action", align: "right" },
];

interface QuotationListTableProps {
  data: IQuotationListRow[];
  isLoading: boolean;
  onCancel: (id: string) => void;
  onApprove: (id: string) => void;
}

export default function QuotationListTable({
  data,
  isLoading,
  onCancel,
  onApprove,
}: QuotationListTableProps) {
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

  function renderRow(quotation: IQuotationListRow) {
    const status = quotationStatusConfig[quotation.status];
    const actions = getQuotationListActions(quotation, { onCancel, onApprove });

    return (
      <>
        <td className="px-4 py-3 text-table-cell-text">
          {quotation.quotationId}
        </td>
        <td className="px-4 py-3 text-table-cell-text">{quotation.farmName}</td>
        <td className="px-4 py-3 text-table-cell-text font-medium">
          {quotation.productName}
        </td>
        <td className="px-4 py-3 text-center">
          <span
            className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${status.badgeClass}`}
          >
            {status.label}
          </span>
        </td>
        <td className="px-4 py-3 text-table-cell-text">
          {quotation.requestedQuantity}
        </td>
        <td className="px-4 py-3 text-table-cell-text">
          {quotation.createdBy}
        </td>
        <td className="px-4 py-3 text-table-cell-text whitespace-nowrap text-xs">
          {formatTimestamp(quotation.createdAt)}
        </td>
        <td className="px-4 py-3 text-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/quotation/${quotation.quotationId}`);
            }}
            className="px-3 py-1.5 rounded-sm text-xs font-medium border border-green-500 text-app-foreground bg-app-background transition-colors hover:bg-green-700 hover:text-white hover:border-green-700"
          >
            Details
          </button>
        </td>
        <td className="px-4 py-3 text-right">
          {actions.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-sm hover:bg-app-background-hover text-app-foreground"
                >
                  <MoreVertical size={16} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={appPrimaryColorOption}>
                {actions.map((action) => (
                  <DropdownMenuItem
                    key={action.actionName}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (action.confirmMessage) setPendingAction(action);
                      else action.method();
                    }}
                    className={
                      action.variant === "destructive"
                        ? "text-status-rejected-text focus:bg-status-rejected-bg focus:text-status-rejected-text"
                        : "text-button-secondary-text focus:bg-app-background-hover focus:text-button-secondary-text"
                    }
                  >
                    {action.actionName}
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
      <ReusableTable
        columns={columns}
        data={data}
        renderRow={renderRow}
        loading={isLoading}
        rowKey={(item) => item.quotationId}
        emptyMessage="No quotations found."
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
