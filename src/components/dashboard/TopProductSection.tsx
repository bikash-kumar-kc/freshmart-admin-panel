"use client";

import { useState } from "react";

import {
  ProductStockStatus,
  TopProductsPeriod,
} from "@/types/dashboard/topProduct.types";
import { useTopProductsQuery } from "@/lib/hooks/useDashBoardTopProduct";
import { selectItemClass } from "./SalesOverviewChart";
import ResponsiveProductList from "./ResponsiveProductList";
import ReuseableSelect from "../ReuseableSelect";

export const selectTrigger =
  "w-36 h-8 rounded-md  bg-app-background border-app-border text-app-foreground  px-3.5 py-5 text-sm transition-colors hover:border-gray-400";
export const selectContent =
  "bg-app-background border-app-border text-app-foreground p-2 space-y-2 ";

const contentStatus = {
  style: selectContent,
  items: [
    {
      name: "All statuses",
      value: "all",
      style: selectItemClass,
    },
    {
      name: "In Stock",
      value: "in_stock",
      style: `${selectItemClass} mt-2`,
    },
    {
      name: "Low Stock",
      value: "low_stock",
      style: `${selectItemClass} mt-2`,
    },
    {
      name: "Out of Stock",
      value: "out_of_stock",
      style: `${selectItemClass} mt-2`,
    },
  ],
};

const contentFilter = {
  style: selectContent,
  items: [
    {
      name: "Last Week",
      value: "week",
      style: selectItemClass,
    },
    {
      name: "Last Month",
      value: "month",
      style: `${selectItemClass} mt-2`,
    },
  ],
};

const triggerStatus = {
  style: selectTrigger,
  placeholder: "Status",
};

const triggerFilter = {
  style: selectTrigger,
  placeholder: "",
};

export default function TopProductsSection() {
  const [period, setPeriod] = useState<TopProductsPeriod>("week");
  const [statusFilter, setStatusFilter] = useState<ProductStockStatus | "all">(
    "all",
  );

  const { data, isLoading } = useTopProductsQuery(period, statusFilter);

  const selectDataStatus = {
    select: {
      value: statusFilter,
      onSelectChange: setStatusFilter,
      default: "all",
    },
    trigger: triggerStatus,
    content: contentStatus,
  };

  const selectDataFilter = {
    select: {
      value: period,
      onSelectChange: setPeriod,
      default: "month",
    },
    trigger: triggerFilter,
    content: contentFilter,
  };

  return (
    <div className="bg-statcard-background border border-statcard-border rounded-sm p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h3 className="text-sm font-semibold text-app-foreground">
          Top Products
        </h3>

        <div className="flex items-center gap-2">
          <ReuseableSelect<ProductStockStatus> data={selectDataStatus} />
          <ReuseableSelect<TopProductsPeriod> data={selectDataFilter} />
        </div>
      </div>

      <ResponsiveProductList data={data ?? []} isLoading={isLoading} />
    </div>
  );
}
