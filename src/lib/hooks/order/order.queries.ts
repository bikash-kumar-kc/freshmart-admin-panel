
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import orderServices from "@/services/order/order.service";
import { showToast } from "@/components/Toast";
import type {
  IOrderListQuery,
  InventoryOrderStatus,
} from "@/types/order/order.types";

export const orderKeys = {
  all: ["orders"] as const,
  inventoryList: (q: IOrderListQuery) =>
    [...orderKeys.all, "inventory", "list", q] as const,
  displayList: (q: IOrderListQuery) =>
    [...orderKeys.all, "display", "list", q] as const,
  inventoryDetail: (id: string) =>
    [...orderKeys.all, "inventory", "detail", id] as const,
  displayDetail: (id: string) =>
    [...orderKeys.all, "display", "detail", id] as const,
};

export function useInventoryOrderListQuery(query: IOrderListQuery) {
  return useQuery({
    queryKey: orderKeys.inventoryList(query),
    queryFn: () => orderServices.listInventory(query),
  });
}

export function useDisplayOrderListQuery(query: IOrderListQuery) {
  return useQuery({
    queryKey: orderKeys.displayList(query),
    queryFn: () => orderServices.listDisplay(query),
  });
}

export function useInventoryOrderDetailQuery(orderId: string) {
  return useQuery({
    queryKey: orderKeys.inventoryDetail(orderId),
    queryFn: () => orderServices.getInventoryDetail(orderId),
    enabled: !!orderId,
  });
}

export function useDisplayOrderDetailQuery(orderId: string) {
  return useQuery({
    queryKey: orderKeys.displayDetail(orderId),
    queryFn: () => orderServices.getDisplayDetail(orderId),
    enabled: !!orderId,
  });
}

export function useUpdateInventoryStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      orderId,
      status,
    }: {
      orderId: string;
      status: InventoryOrderStatus;
    }) => orderServices.updateInventoryStatus(orderId, status),
    onSuccess: (_data, variables) => {

      queryClient.invalidateQueries({
        queryKey: [...orderKeys.all, "inventory", "list"],
      });
      queryClient.invalidateQueries({
        queryKey: orderKeys.inventoryDetail(variables.orderId),
      });
      showToast.success("Order updated", `Status changed successfully.`);
    },
  });
}
