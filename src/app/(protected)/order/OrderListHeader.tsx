// orders/OrderListHeader.tsx
"use client";

import { useState } from "react";
import PageHeading from "@/components/PageHeading";
import SearchComponent from "@/components/SearchComponent";
import { OrderBucket } from "@/types/order/order.types";
import ReuseableSelect from "@/components/ReuseableSelect";
import { appPrimaryColorOption } from "../vendors/VendorPageHeader";
import { selectItemClass } from "@/components/dashboard/SalesOverviewChart";

const statusOptionsByBucket: Record<
  OrderBucket,
  { name: string; value: string }[]
> = {
  inventory: [
    { name: "All status", value: "all" },
    { name: "Processing", value: "processing" },
    { name: "Shipped", value: "shipped" },
    { name: "Delivered", value: "delivered" },
    { name: "Cancelled", value: "cancelled" },
  ],
  display: [
    { name: "All status", value: "all" },
    { name: "Pending", value: "pending" },
    { name: "Processing", value: "processing" },
    { name: "Delivered", value: "delivered" },
    { name: "Cancelled", value: "cancelled" },
  ],
};

interface OrderListHeaderProps {
  bucket: OrderBucket;
  onBucketChange: (b: OrderBucket) => void;
  status: string;
  onStatusChange: (s: string) => void;
  onSearchChange: (v: string) => void;
}

export function OrderListHeader({
  bucket,
  onBucketChange,
  status,
  onStatusChange,
  onSearchChange,
}: OrderListHeaderProps) {
  const [query, setQuery] = useState("");

  return (
    <div className="space-y-4 mb-4">
      <PageHeading
        title="Orders"
        message="Manage inventory and vendor-fulfilled display orders"
      />

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <SearchComponent
          searchData={{
            placeholder: "Search by order ID...",
            value: query,
            onChange: (v) => {
              setQuery(v);
              onSearchChange(v);
            },
            autofocus: false,
            containerSytling: "w-full md:block relative md:w-72",
          }}
        />

        <div className="flex items-center gap-2">
          <div className="flex border border-app-border rounded-sm overflow-hidden">
            <button
              onClick={() => onBucketChange("inventory")}
              className={`px-3 py-2 text-xs font-medium transition-colors ${bucket === "inventory" ? "bg-brand-primary text-white" : "text-app-foreground hover:bg-app-background-hover"}`}
            >
              Inventory
            </button>
            <button
              onClick={() => onBucketChange("display")}
              className={`px-3 py-2 text-xs font-medium transition-colors ${bucket === "display" ? "bg-brand-primary text-white" : "text-app-foreground hover:bg-app-background-hover"}`}
            >
              Display
            </button>
          </div>

          <ReuseableSelect<string>
            data={{
              select: {
                value: status,
                onSelectChange: onStatusChange,
                default: "all",
              },
              trigger: {
                style:
                  "w-36 shrink-0 border-app-border hover:text-app-foreground transition-colors",
                placeholder: "Status",
              },
              content: {
                style: appPrimaryColorOption,
                items: statusOptionsByBucket[bucket].map((o) => ({
                  name: o.name,
                  value: o.value,
                  style: selectItemClass,
                })),
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
