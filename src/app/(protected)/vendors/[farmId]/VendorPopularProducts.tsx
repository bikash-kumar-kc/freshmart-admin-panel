// vendors/VendorPopularProducts.tsx
"use client";

import ReuseableSelect from "@/components/ReuseableSelect";
import { ITopProduct, ProductStockStatus } from "@/types/dashboard/topProduct.types";
import { useState } from "react";
import { appPrimaryColorOption } from "../VendorPageHeader";
import { selectItemClass } from "@/components/dashboard/SalesOverviewChart";
import ResponsiveProductList from "@/components/dashboard/ResponsiveProductList";


export function VendorPopularProducts({ products }: { products: ITopProduct[] }) {
  const [statusFilter, setStatusFilter] = useState<ProductStockStatus | "all">("all");

  const filtered =
    statusFilter === "all" ? products : products.filter((p) => p.status === statusFilter);

  return (
    <div className="bg-statcard-background border border-statcard-border rounded-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-app-foreground">Most Popular Products</h3>

        <ReuseableSelect<ProductStockStatus | "all">
          data={{
            select: { value: statusFilter, onSelectChange: setStatusFilter, default: "all" },
            trigger: {
              style: "w-36 shrink-0 border-app-border hover:text-app-foreground transition-colors",
              placeholder: "Status",
            },
            content: {
              style: appPrimaryColorOption,
              items: [
                { name: "All statuses", value: "all", style: selectItemClass },
                { name: "In Stock", value: "in_stock", style: selectItemClass },
                { name: "Low Stock", value: "low_stock", style: selectItemClass },
                { name: "Out of Stock", value: "out_of_stock", style: selectItemClass },
              ],
            },
          }}
        />
      </div>

      <ResponsiveProductList data={filtered} isLoading={false} />
    </div>
  );
}