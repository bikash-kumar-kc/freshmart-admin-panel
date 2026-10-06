// app/(protected)/order/InventoryOrderCard.tsx
"use client";

import { useRouter } from "next/navigation";
import { ListCard } from "@/components/ListCard";
import {
  inventoryStatusConfig,
  inventoryStatusTransitions,
} from "@/lib/constants/order/OrderStatusConfit";
import { useUpdateInventoryStatusMutation } from "@/lib/hooks/order/order.queries";

import type {
  IInventoryOrderRow,
  InventoryOrderStatus,
} from "@/types/order/order.types";
import { formatTimestamp } from "@/lib/utilis/timeFormatter";

const variantMap: Record<
  InventoryOrderStatus,
  "approved" | "awaiting" | "rejected" | "inprogress"
> = {
  packaging: "inprogress",
  ontheway: "awaiting",
  delivered: "approved",
  failed: "rejected",
};

export default function InventoryOrderCard({
  order,
}: {
  order: IInventoryOrderRow;
}) {
  const router = useRouter();
  const updateStatusMutation = useUpdateInventoryStatusMutation();

  const nextStatuses = inventoryStatusTransitions[order.status];
  const actions = nextStatuses.map((next) => ({
    actionName: `Mark as ${inventoryStatusConfig[next].label}`,
    confirmMessage: `Mark ${order.orderId} as ${inventoryStatusConfig[next].label}?`,
    variant:
      next === "failed" ? ("destructive" as const) : ("default" as const),
    method: () =>
      updateStatusMutation.mutateAsync({
        orderId: order.orderId,
        status: next,
      }),
  }));

  return (
    <ListCard
      title={order.customerName}
      status={{
        label: inventoryStatusConfig[order.status].label,
        variant: variantMap[order.status],
      }}
      facts={[
        order.orderId,
        `${order.totalItems} items`,
        formatTimestamp(order.createdAt),
      ]}
      onClick={() => router.push(`/order/inventory/${order.orderId}`)}
      actions={actions}
    />
  );
}
