// notifications/NotificationCard.tsx
"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { INotificationItem } from "@/types/notification/notification.types";
import { notificationSubTypeConfig } from "@/lib/constants/notification/notificationSubtypeConfig";
import { formatTimestamp } from "@/lib/utilis/timeFormatter";


interface NotificationCardProps {
  notification: INotificationItem;
  onToggleRead: (id: string) => void;
  onDismiss: (id: string) => void;
}

const referenceRouteMap: Record<NonNullable<INotificationItem["referenceType"]>, string> = {
  quotation: "/quotation",
  vendor: "/vendors",
  productListing: "/products/productListing",
};

export function NotificationCard({ notification, onToggleRead, onDismiss }: NotificationCardProps) {
  const router = useRouter();
  const config = notificationSubTypeConfig[notification.subType];
  const Icon = config.icon;

  function handleView(e: React.MouseEvent) {
    e.stopPropagation();
    if (notification.referenceType && notification.referenceId) {
      router.push(`${referenceRouteMap[notification.referenceType]}/${notification.referenceId}`);
    }
  }

  function handleDismiss(e: React.MouseEvent) {
    e.stopPropagation();
    onDismiss(notification.id);
  }

  return (
    <div
      onClick={() => onToggleRead(notification.id)}
      className={`flex items-start gap-3 p-4 rounded-sm border cursor-pointer transition-colors ${
        notification.isRead
          ? "bg-statcard-background border-statcard-border"
          : "bg-notification-bg-unread border-brand-primary/30"
      }`}
    >
      <div
        className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0"
        style={{ backgroundColor: config.iconBg }}
      >
        <Icon size={16} style={{ color: config.iconColor }} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1.5">
          <span
            className="text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0"
            style={{ backgroundColor: config.iconBg, color: config.iconColor }}
          >
            {config.label}
          </span>
          {/* {!notification.isRead && <span className="w-2 h-2 rounded-full bg-brand-cta shrink-0" />} */}
        </div>

        <p className="text-sm font-medium text-app-foreground leading-snug">{notification.message}</p>
        <p className="text-[11px] text-app-muted-foreground mt-1">{formatTimestamp(notification.createdAt)}</p>

        {notification.referenceType && (
          <button
            onClick={handleView}
            className="mt-2 px-3 py-1.5 rounded-sm text-xs font-medium bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors"
          >
            View
          </button>
        )}
      </div>

      <button
        onClick={handleDismiss}
        className="p-1.5 rounded-sm text-app-muted-foreground hover:bg-status-rejected-bg hover:text-status-rejected-text transition-colors shrink-0"
      >
        <X size={14} />
      </button>
    </div>
  );
}