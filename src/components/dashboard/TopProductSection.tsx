"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/components/ui/select";
import {
  ProductStockStatus,
  TopProductsPeriod,
} from "@/types/dashboard/topProduct.types";
import { useTopProductsQuery } from "@/lib/hooks/useDashBoardTopProduct";
import { selectItemClass } from "./SalesOverviewChart";
import ResponsiveProductList from "./ResponsiveProductList";

export const selectTrigger =
  "w-36 h-8 rounded-md  bg-app-background border-app-border text-app-foreground  px-3.5 py-5 text-sm transition-colors hover:border-gray-400";
export const selectContent =
  "bg-app-background border-app-border text-app-foreground p-2 space-y-2 ";
export default function TopProductsSection() {
  const [period, setPeriod] = useState<TopProductsPeriod>("week");
  const [statusFilter, setStatusFilter] = useState<ProductStockStatus | "all">(
    "all",
  );

  const { data, isLoading } = useTopProductsQuery(period, statusFilter);

  return (
    <div className="bg-statcard-background border border-statcard-border rounded-sm p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h3 className="text-sm font-semibold text-app-foreground">
          Top Products
        </h3>

        <div className="flex items-center gap-2">
          <Select
            value={statusFilter}
            onValueChange={(v) =>
              setStatusFilter(v as ProductStockStatus | "all")
            }
          >
            <SelectTrigger className={`${selectTrigger}`}>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className={`${selectContent}`}>
              <SelectItem value="all" className={selectItemClass}>
                All statuses
              </SelectItem>
              <SelectItem
                value="in_stock"
                className={`${selectItemClass} mt-2`}
              >
                In Stock
              </SelectItem>
              <SelectItem
                value="low_stock"
                className={`${selectItemClass} mt-2`}
              >
                Low Stock
              </SelectItem>
              <SelectItem
                value="out_of_stock"
                className={`${selectItemClass} mt-2`}
              >
                Out of Stock
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={period}
            onValueChange={(v) => setPeriod(v as TopProductsPeriod)}
          >
            <SelectTrigger className={`${selectTrigger}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className={`${selectContent}`}>
              <SelectItem value="week" className={selectItemClass}>
                Last week
              </SelectItem>
              <SelectItem value="month" className={`${selectItemClass} mt-2`}>
                Last month
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ResponsiveProductList data={data ?? []} isLoading={isLoading} />
    </div>
  );
}
