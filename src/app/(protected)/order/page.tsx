"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Pagination from "@/components/Pagination";
import { InventoryOrderStatus, OrderBucket } from "@/types/order/order.types";
import {
  useDisplayOrderListQuery,
  useInventoryOrderListQuery,
  useUpdateInventoryStatusMutation,
} from "@/lib/hooks/order/order.queries";
import { OrderListHeader } from "./OrderListHeader";
import ResponsiveOrderList from "./ResponsiveOrderList";

export default function OrderListPage() {
  const queryClient = useQueryClient();

  const [bucket, setBucket] = useState<OrderBucket>("inventory");
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const query = { bucket, status, search, page, pageSize };

  const inventoryQuery = useInventoryOrderListQuery(query);
  const displayQuery = useDisplayOrderListQuery(query);
  const updateStatusMutation = useUpdateInventoryStatusMutation();

  const activeData =
    bucket === "inventory" ? inventoryQuery.data : displayQuery.data;
  const isLoading =
    bucket === "inventory" ? inventoryQuery.isLoading : displayQuery.isLoading;
  const isSearching = search.trim().length > 0;

  async function handleUpdateInventoryStatus(
    orderId: string,
    nextStatus: InventoryOrderStatus,
  ) {
    await updateStatusMutation.mutateAsync({ orderId, status: nextStatus });
    queryClient.invalidateQueries({ queryKey: ["orders"] });
  }

  return (
    <div>
      <OrderListHeader
        bucket={bucket}
        onBucketChange={(b) => {
          setBucket(b);
          setStatus("all");
          setPage(1);
        }}
        status={status}
        onStatusChange={(s) => {
          setStatus(s);
          setPage(1);
        }}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
      />

      <ResponsiveOrderList
        bucket={bucket}
        inventoryData={inventoryQuery.data?.data ?? []}
        displayData={displayQuery.data?.data ?? []}
        isLoading={isLoading}
        onUpdateInventoryStatus={handleUpdateInventoryStatus}
      />

      {!isSearching && activeData && (
        <Pagination
          page={page}
          pageSize={pageSize}
          total={activeData.total}
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
