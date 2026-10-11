// app/notifications/page.tsx
"use client";

import { useState } from "react";
import PageHeading from "@/components/PageHeading";
import Pagination from "@/components/Pagination";
import {
  INotificationItem,
  NotificationPillValue,
} from "@/types/notification/notification.types";
import {
  useNotificationListQuery,
  useSetNotificationReadMutation,
} from "@/lib/hooks/notification/notification.queries";
import { NotificationPillBar } from "./NotificationPillBar";
import { NotificationCard } from "./NotificationCard";

export default function NotificationsPage() {
  const [pill, setPill] = useState<NotificationPillValue>("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Local-only state: toggling read/unread and dismissing (X) are UI-level, not backend writes yet
  const [localOverrides, setLocalOverrides] = useState<
    Record<string, { isRead?: boolean; dismissed?: boolean }>
  >({});

  function toggleRead(id: string) {
    setLocalOverrides((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isRead: !(
          prev[id]?.isRead ?? data?.data.find((n) => n.id === id)?.isRead
        ),
      },
    }));
  }

  function dismiss(id: string) {
    setLocalOverrides((prev) => ({
      ...prev,
      [id]: { ...prev[id], dismissed: true },
    }));
  }

  const [dismissed, setDismissed] = useState<Set<string>>(new Set()); // local only; a reload brings them back
  const { data, isLoading } = useNotificationListQuery({
    pill,
    page,
    pageSize,
  });
  const setRead = useSetNotificationReadMutation();

  const visibleNotifications = (data?.data ?? []).filter(
    (n) => !dismissed.has(n.id),
  );

  return (
    <div>
      <div className="space-y-4 mb-4">
        <PageHeading
          title="Notifications"
          message="Updates from vendors and the platform"
        />
        <NotificationPillBar
          value={pill}
          onChange={(value) => {
            setPill(value);
            setPage(1);
          }}
        />
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <p className="text-sm text-app-muted-foreground text-center py-6">
            Loading...
          </p>
        ) : visibleNotifications.length === 0 ? (
          <p className="text-sm text-app-muted-foreground text-center py-6">
            No notifications found.
          </p>
        ) : (
          visibleNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onToggleRead={(id) => {
                const current = visibleNotifications.find((n) => n.id === id);
                if (current) setRead.mutate({ id, isRead: !current.isRead });
              }}
              onDismiss={(id) => setDismissed((prev) => new Set(prev).add(id))}
            />
          ))
        )}
      </div>

      {data && (
        <Pagination
          page={page}
          pageSize={pageSize}
          total={data.total}
          onPageChange={setPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
        />
      )}
    </div>
  );
}
