
"use client";

import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PageHeading from "@/components/PageHeading";
import { InventoryOrderStatus, OrderBucket } from "@/types/order/order.types";
import { getOrderDetailDemoData } from "@/lib/constants/order/OrderDetailsDemoData";
import { OrderInfoCard } from "./OrderInfoCard";
import { OrderItemsTable } from "./OrderItemsTable";
import { CustomerInfoCard } from "./CustomerInfoCard";
import { OrderDetailActionBar } from "../../OrderDetailsActionBar";

export default function OrderDetailPage() {
  const { bucket, orderId } = useParams<{
    bucket: OrderBucket;
    orderId: string;
  }>();
  const queryClient = useQueryClient();

  const { data: order, isLoading } = useQuery({
    queryKey: ["orderDetail", orderId],
    queryFn: () => Promise.resolve(getOrderDetailDemoData(orderId, bucket)),
  });

  const updateStatusMutation = useMutation({
    mutationFn: async (status: InventoryOrderStatus) => {
      console.log("update order status", orderId, status);
      return { success: true };
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["orderDetail", orderId] }),
  });

  if (isLoading || !order) {
    return <p className="text-sm text-app-muted-foreground">Loading...</p>;
  }

  return (
    <div className="space-y-5">
      <PageHeading
        title={`Order ${order.orderId}`}
        message="Review order, items, and customer details"
      />

      <OrderInfoCard order={order} />
      <OrderItemsTable
        items={order.items}
        totalDiscount={order.totalDiscount}
      />
      <CustomerInfoCard customer={order.customer} />
      <OrderDetailActionBar
        order={order}
        onUpdateStatus={updateStatusMutation.mutate}
      />
    </div>
  );
}
