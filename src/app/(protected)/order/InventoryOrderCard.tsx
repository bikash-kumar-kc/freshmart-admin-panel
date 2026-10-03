// orders/InventoryOrderCard.tsx
"use client";

import { useRouter } from "next/navigation";
import { ListCard } from "@/components/ListCard";
import {
  IInventoryOrderRow,
  InventoryOrderStatus,
} from "@/types/order/order.types";
import {
  inventoryStatusConfig,
  inventoryStatusTransitions,
} from "@/lib/constants/order/OrderStatusConfit";
import { formatTimestamp } from "@/lib/utilis/timeFormatter";

const variantMap: Record<
  InventoryOrderStatus,
  "approved" | "awaiting" | "rejected" | "inprogress"
> = {
  processing: "inprogress",
  shipped: "awaiting",
  delivered: "approved",
  cancelled: "rejected",
};

export default function InventoryOrderCard({
  order,
  onUpdateStatus,
}: {
  order: IInventoryOrderRow;
  onUpdateStatus: (orderId: string, status: InventoryOrderStatus) => void;
}) {
  const router = useRouter();
  const actions = inventoryStatusTransitions[order.status].map((next) => ({
    actionName: `Mark as ${inventoryStatusConfig[next].label}`,
    confirmMessage: `Mark ${order.orderId} as ${inventoryStatusConfig[next].label}?`,
    variant:
      next === "cancelled" ? ("destructive" as const) : ("default" as const),
    method: () => onUpdateStatus(order.orderId, next),
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
        formatTimestamp(order.orderDate),
      ]}
      meta={
        order.deliveryDate
          ? `Delivery: ${formatTimestamp(order.deliveryDate)}`
          : undefined
      }
      onClick={() => router.push(`/order/inventory/${order.orderId}`)}
      actions={actions}
    />
  );
}
