// products/ProductSalesTrendChart.tsx
"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { format } from "date-fns";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/components/ui/chart";
import { IProductSalesTrendPoint } from "@/types/product/productLiveDetails.types";

const chartConfig = {
  sales: { label: "Sales", color: "var(--chart-earning)" },
} satisfies ChartConfig;

export function ProductSalesTrendChart({
  data,
}: {
  data: IProductSalesTrendPoint[];
}) {
  return (
    <div className="bg-statcard-background border border-statcard-border rounded-sm p-5">
      <h3 className="text-sm font-semibold text-app-foreground mb-4">
        Sales Trend (Last 30 Days)
      </h3>

      <ChartContainer config={chartConfig} className="h-56 w-full">
        <AreaChart
          data={data}
          margin={{ left: 12, right: 12, top: 8, bottom: 0 }}
        >
          <defs>
            <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--chart-earning)"
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor="var(--chart-earning)"
                stopOpacity={0.02}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical={false}
            stroke="var(--app-border)"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="date"
            tickFormatter={(value) => format(new Date(value), "MMM d")}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            interval={5}
            tick={{ fontSize: 11, fill: "var(--statcard-label)" }}
          />

          <ChartTooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const point = payload[0].payload as IProductSalesTrendPoint;
              return (
                <div className="bg-statcard-background border border-statcard-border rounded-sm p-2.5 shadow-lg">
                  <p className="text-xs font-medium text-app-foreground">
                    {format(new Date(point.date), "MMM d")}
                  </p>
                  <p className="text-xs text-statcard-label mt-0.5">
                    {point.sales} units sold
                  </p>
                </div>
              );
            }}
          />

          <Area
            dataKey="sales"
            type="monotone"
            stroke="var(--chart-earning)"
            fill="url(#fillSales)"
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
