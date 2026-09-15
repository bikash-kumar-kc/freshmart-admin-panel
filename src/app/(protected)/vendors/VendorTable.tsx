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
import { IVendorListItem } from "@/types/vendors/vendorList.types";
import { getVendorActions, IVendorAction } from "./vendorAction";
import { vendorStatusConfig } from "@/lib/constants/vendors/vendorStatusConfig";
import { formatTimestamp } from "@/lib/utilis/timeFormatter";
import { GenericDropdown } from "@/components/DropDown";

const columns: IColumn[] = [
  { id: "farmId", label: "ID" },
  { id: "farmName", label: "Farm Name" },
  { id: "location", label: "Location" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "status", label: "Status", align: "center" },
  { id: "createdAt", label: "Created At" },
  { id: "details", label: "Details", align: "center" },
  { id: "action", label: "Action", align: "right" },
];

function locationText(v: IVendorListItem) {
  return `${v.location.ward}, ${v.location.municipality}, ${v.location.district}`;
}

interface VendorsTableProps {
  data: IVendorListItem[];
  isLoading: boolean;
  onApprove: (id: string) => void;
  onUnapprove: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function VendorsTable({
  data,
  isLoading,
  onApprove,
  onUnapprove,
  onDelete,
}: VendorsTableProps) {
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

  function renderRow(vendor: IVendorListItem) {
    const status = vendorStatusConfig[vendor.status];
    const actions = getVendorActions(vendor, {
      onApprove,
      onUnapprove,
      onDelete,
    });

    return (
      <>
        <td className="px-4 py-3 text-table-cell-text">{vendor.farmId}</td>
        <td className="px-4 py-3 text-table-cell-text font-medium">
          {vendor.farmName}
        </td>
        <td className="px-4 py-3 text-table-cell-text">
          {locationText(vendor)}
        </td>
        <td className="px-4 py-3 text-table-cell-text">{vendor.email}</td>
        <td className="px-4 py-3 text-table-cell-text">{vendor.phone}</td>
        <td className="px-4 py-3 text-center">
          <span
            className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${status.badgeClass}`}
          >
            {status.label}
          </span>
        </td>
        <td className="px-4 py-3 text-table-cell-text whitespace-nowrap text-xs">
          {formatTimestamp(vendor.createdAt)}
        </td>
        <td className="px-4 py-3 text-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/vendors/${vendor.farmId}`);
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
                  className="p-1.5 rounded-sm hover:bg-menu-item-hover-bg text-app-foreground"
                >
                  <MoreVertical size={16} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-app-background border-app-border text-app-foreground px-2 py-3"
              >
                {actions.map((action, idx) => (
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
                        : " focus:bg-[#262626] focus:text-app-foreground" +
                          `${idx != 0 ? "mt-2" : "mt-0"}`
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
        rowKey={(item) => item.farmId}
        emptyMessage="No vendors found."
      />

      <AlertDialog
        open={!!pendingAction}
        onOpenChange={(open) => !open && setPendingAction(null)}
      >
        <AlertDialogContent className="rounded-sm bg-app-background border-app-border text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>{pendingAction?.actionName}</AlertDialogTitle>
            <AlertDialogDescription className="hover:text-app-foreground">
              {pendingAction?.confirmMessage}
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
    </>
  );
}
