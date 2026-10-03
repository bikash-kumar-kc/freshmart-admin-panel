import orderServices from "@/services/order/order.service";
import { IOrderListQuery } from "@/types/order/order.types";
import { useQuery, useMutation } from "@tanstack/react-query";

export const orderKeys = {
  inventory: (q: IOrderListQuery) => ["orders", "inventory", q] as const,
  display: (q: IOrderListQuery) => ["orders", "display", q] as const,
};

export function useInventoryOrderListQuery(query: IOrderListQuery) {
  return useQuery({
    queryKey: orderKeys.inventory(query),
    queryFn: () => orderServices.listInventory(query),
  });
}

export function useDisplayOrderListQuery(query: IOrderListQuery) {
  return useQuery({
    queryKey: orderKeys.display(query),
    queryFn: () => orderServices.listDisplay(query),
  });
}

export function useUpdateInventoryStatusMutation() {
  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: string }) =>
      orderServices.updateInventoryStatus(orderId, status),
  });
}
