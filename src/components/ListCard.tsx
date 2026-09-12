// components/ListCard.tsx
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

export interface IListCardAction {
  actionName: string;
  method: () => void | Promise<void>;
  confirmMessage?: string;
  variant?: "default" | "destructive";
}

export interface IListCardStatus {
  label: string;
  variant: "awaiting" | "inprogress" | "approved" | "rejected" | "neutral";
}

interface IListCardProps {
  title: string;
  status?: IListCardStatus;
  facts: string[];
  meta?: string;
  onClick?: () => void;
  actions?: IListCardAction[];
}

const statusColors: Record<IListCardStatus["variant"], string> = {
  awaiting: "bg-status-awaiting-bg text-status-awaiting-text",
  inprogress: "bg-status-inprogress-bg text-status-inprogress-text",
  approved: "bg-status-approved-bg text-status-approved-text",
  rejected: "bg-status-rejected-bg text-status-rejected-text",
  neutral: "bg-status-neutral-bg text-status-neutral-text",
};

export function ListCard({ title, status, facts, meta, onClick, actions }: IListCardProps) {
  const [pendingAction, setPendingAction] = useState<IListCardAction | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  function handleActionClick(e: React.MouseEvent, action: IListCardAction) {
    e.stopPropagation(); // don't also trigger the card's own onClick (navigation)
    if (action.confirmMessage) {
      setPendingAction(action);
    } else {
      action.method();
    }
  }

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
    <>
      <div
        onClick={onClick}
        className="border border-app-border rounded-sm p-4 bg-statcard-background active:bg-table-row-bg-hover transition-colors cursor-pointer"
      >
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-app-foreground truncate">{title}</p>
          {status && (
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0 ${statusColors[status.variant]}`}
            >
              {status.label}
            </span>
          )}
        </div>

        {facts.length > 0 && (
          <p className="text-sm text-app-foreground/80 mt-1">{facts.join(" · ")}</p>
        )}

        {meta && <p className="text-xs text-app-muted-foreground mt-1.5">{meta}</p>}

        {actions && actions.length > 0 && (
          <div className="mt-3 flex justify-end gap-2">
            {actions.map((action) => (
              <button
                key={action.actionName}
                onClick={(e) => handleActionClick(e, action)}
                className={`text-xs font-medium px-3 py-1.5 rounded-sm transition-colors ${
                  action.variant === "destructive"
                    ? "text-status-rejected-text hover:bg-status-rejected-bg"
                    : "text-brand-primary hover:bg-brand-primary-soft"
                }`}
              >
                {action.actionName}
              </button>
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={!!pendingAction} onOpenChange={(open) => !open && setPendingAction(null)}>
        <AlertDialogContent className="rounded-sm" onClick={(e) => e.stopPropagation()}>
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
    </>
  );
}