"use client";

import InventoryOrderTable from "./InventoryOrderTable";
import InventoryOrderCard from "./InventoryOrderCard";
import DisplayOrderTable from "./DisplayOrderTable";
import DisplayOrderCard from "./DisplayOrderCard";
import {
  IDisplayOrderRow,
  IInventoryOrderRow,
  InventoryOrderStatus,
  OrderBucket,
} from "@/types/order/order.types";
import { useIsMobile } from "@/lib/hooks/useMobileHook";

interface ResponsiveOrderListProps {
  bucket: OrderBucket;
  inventoryData: IInventoryOrderRow[];
  displayData: IDisplayOrderRow[];
  isLoading: boolean;
  onUpdateInventoryStatus: (
    orderId: string,
    status: InventoryOrderStatus,
  ) => void;
}

export default function ResponsiveOrderList({
  bucket,
  inventoryData,
  displayData,
  isLoading,
  onUpdateInventoryStatus,
}: ResponsiveOrderListProps) {
  const isMobile = useIsMobile();

  if (bucket === "inventory") {
    if (isMobile) {
      return (
        <div className="space-y-3">
          {isLoading ? (
            <p className="text-sm text-app-muted-foreground text-center py-6">
              Loading...
            </p>
          ) : inventoryData.length === 0 ? (
            <p className="text-sm text-app-muted-foreground text-center py-6">
              No orders found.
            </p>
          ) : (
            inventoryData.map((o) => (
              <InventoryOrderCard
                key={o.orderId}
                order={o}
                onUpdateStatus={onUpdateInventoryStatus}
              />
            ))
          )}
        </div>
      );
    }
    return (
      <InventoryOrderTable
        data={inventoryData}
        isLoading={isLoading}
        onUpdateStatus={onUpdateInventoryStatus}
      />
    );
  }

  if (isMobile) {
    return (
      <div className="space-y-3">
        {isLoading ? (
          <p className="text-sm text-app-muted-foreground text-center py-6">
            Loading...
          </p>
        ) : displayData.length === 0 ? (
          <p className="text-sm text-app-muted-foreground text-center py-6">
            No orders found.
          </p>
        ) : (
          displayData.map((o) => <DisplayOrderCard key={o.orderId} order={o} />)
        )}
      </div>
    );
  }
  return <DisplayOrderTable data={displayData} isLoading={isLoading} />;
}
