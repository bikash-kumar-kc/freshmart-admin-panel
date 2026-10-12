// orders/DisplayOrderCard.tsx
"use client";

import { useRouter } from "next/navigation";
import { ListCard } from "@/components/ListCard";
import { IDisplayOrderRow } from "@/types/order/order.types";
import { getDisplayStatusDisplay } from "@/lib/constants/order/OrderStatusConfit";
import { formatTimestamp } from "@/lib/utilis/timeFormatter";

export default function DisplayOrderCard({
  order,
}: {
  order: IDisplayOrderRow;
}) {
  const router = useRouter();
  const status = getDisplayStatusDisplay(order.status, order.completionReason);

  return (
    <ListCard
      title={order.customerName}
      status={{ label: status.label, variant: "neutral" }}
      facts={[order.orderId, order.farmName as string, `${order.totalItems} items`]}
      meta={`Deadline: ${formatTimestamp(order.confirmationDeadline as string)}`}
      onClick={() => router.push(`/order/display/${order.orderId}`)}
    />
  );
}
