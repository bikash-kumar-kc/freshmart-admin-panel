// api/notifications/notification.queries.ts
import notificationServices from "@/services/notification/notification.service";
import type{ INotificationQuery } from "@/types/notification/notification.types";
import { useQuery } from "@tanstack/react-query";


export const notificationKeys = {
  all: ["notifications"] as const,
  list: (query: INotificationQuery) => [...notificationKeys.all, "list", query] as const,
};

export function useNotificationListQuery(query: INotificationQuery) {
  return useQuery({
    queryKey: notificationKeys.list(query),
    queryFn: () => notificationServices.list(query),
  });
}

// api/notifications/notification.queries.ts (addition)
export function useUnreadNotificationCountQuery() {
  return useQuery({
    queryKey: [...notificationKeys.all, "unreadCount"],
    queryFn: () => notificationServices.getUnreadCount(),
    refetchInterval: 5000, // poll every 5s
    refetchIntervalInBackground: false, // pause polling when the tab isn't focused — avoids wasted requests
  });
}