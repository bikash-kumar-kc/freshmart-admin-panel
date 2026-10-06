// app/(protected)/order/[bucket]/[orderId]/page.tsx
"use client";

import { useParams } from "next/navigation";
import PageHeading from "@/components/PageHeading";
import { useInventoryOrderDetailQuery, useDisplayOrderDetailQuery } from "@/lib/hooks/order/order.queries";
import { OrderInfoCard } from "./OrderInfoCard";
import { OrderItemsTable } from "./OrderItemsTable";
import { CustomerInfoCard } from "./CustomerInfoCard";
import { OrderDetailsActionBar } from "./OrderDetailActionBar";
import type { OrderBucket } from "@/types/order/order.types";

export default function OrderDetailPage() {
  const { bucket, orderId } = useParams<{ bucket: OrderBucket; orderId: string }>();

  const inventoryQuery = useInventoryOrderDetailQuery(bucket === "inventory" ? orderId : "");
  const displayQuery = useDisplayOrderDetailQuery(bucket === "display" ? orderId : "");

  const { data, isLoading } = bucket === "inventory" ? inventoryQuery : displayQuery;
  console.log(data)

  if (isLoading || !data) {
    return <p className="text-sm text-app-muted-foreground">Loading...</p>;
  }

  const totalDiscount =
    data.order?.totalPrice != null && data.order?.totalPriceAfterDiscount != null
      ? data.order?.totalPrice - data.order?.totalPriceAfterDiscount
      : null;

  console.log(data.order)

  return (
    <div className="space-y-5">
      <PageHeading title={`Order ${data.order.orderId}`} message="Review order, items, and customer details" />

      <OrderInfoCard
        bucket={bucket}
        order={data.order}
        items={data.items}
        farmName={bucket === "display" ? (data as any).vendor?.farmName : undefined}
      />
      <OrderItemsTable items={data.items} totalDiscount={totalDiscount} />
      <CustomerInfoCard customer={data.customer} />
      {bucket === "inventory" && <OrderDetailsActionBar order={data.order} />}
    </div>
  );
}