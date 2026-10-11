// lib/hooks/notification/notification.queries.ts
"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient, type QueryKey } from "@tanstack/react-query";
import notificationServices from "@/services/notification/notification.service";
import { showToast } from "@/components/Toast";
import { getApiErrorMessage } from "@/lib/utilis/apiError";
import type { INotificationQuery, INotificationResponse } from "@/types/notification/notification.types";

export const notificationKeys = {
  all: ["notifications"] as const,
  list: (q: INotificationQuery) => [...notificationKeys.all, "list", q] as const,
  unreadCount: () => [...notificationKeys.all, "unreadCount"] as const,
};

export function useNotificationListQuery(query: INotificationQuery) {
  return useQuery({
    queryKey: notificationKeys.list(query),
    queryFn: () => notificationServices.list(query),
    placeholderData: keepPreviousData,
  });
}

export function useUnreadNotificationCountQuery() {
  return useQuery({
    queryKey: notificationKeys.unreadCount(),
    queryFn: () => notificationServices.getUnreadCount(),
    refetchInterval: 5000,
    refetchIntervalInBackground: false, // pause while the tab is hidden
    refetchOnWindowFocus: true,         // catch up immediately when the tab returns
    retry: false,                       // the next tick is the retry
    meta: { silent: true },             // never toast from a 5s poll
  });
}

export function useSetNotificationReadMutation() {
  const queryClient = useQueryClient();
  const listKey = [...notificationKeys.all, "list"];

  return useMutation({
    mutationFn: ({ id, isRead }: { id: string; isRead: boolean }) => notificationServices.setRead(id, isRead),

    // Optimistic: the card flips instantly, and rolls back if the request fails
    onMutate: async ({ id, isRead }) => {
      await queryClient.cancelQueries({ queryKey: listKey });
      const previous = queryClient.getQueriesData<INotificationResponse>({ queryKey: listKey });
      queryClient.setQueriesData<INotificationResponse>({ queryKey: listKey }, (old) =>
        old ? { ...old, data: old.data.map((n) => (n.id === id ? { ...n, isRead } : n)) } : old,
      );
      return { previous };
    },
    onError: (error, _vars, context) => {
      context?.previous.forEach(([key, data]: [QueryKey, INotificationResponse | undefined]) =>
        queryClient.setQueryData(key, data),
      );
      showToast.error("Failed to update notification", getApiErrorMessage(error));
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: notificationKeys.all }), // list and bell count
  });
}