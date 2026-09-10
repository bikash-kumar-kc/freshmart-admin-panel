"use client";

import { useState } from "react";
import { format } from "date-fns";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  ISalesOverviewPoint,
  SalesOverviewPeriod,
} from "@/types/dashboard/salesOverview.types";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from "../components/ui/chart";
import { useDashboardSalesOverviewQuery } from "@/lib/hooks/useDashboardSalesOverview";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const selectItemClass =
  "relative cursor-pointer rounded-sm py-2 pl-8 pr-3 text-sm text-gray-700 transition-colors " +
  "data-[highlighted]:bg-[#262626] data-[highlighted]:!text-white text-button-secondary-text " +
  "data-[state=checked]:bg-button-secondary-bg data-[state=checked]:text-button-secondary-text  data-[state=checked]:font-medium";

const chartConfig = {
  earning: {
    label: "Earning",
    color: "var(--chart-earning)",
  },
  expenditure: {
    label: "Expenditure",
    color: "var(--chart-expenditure)",
  },
} satisfies ChartConfig;

function CustomTooltip({
  active,
  payload,
  data,
}: {
  active?: boolean;
  payload?: { payload: ISalesOverviewPoint }[];
  data: ISalesOverviewPoint[];
}) {
  if (!active || !payload?.length) return null;

  const point = payload[0].payload;
  const index = data.findIndex((d) => d.date === point.date);
  const previous = index > 0 ? data[index - 1] : null;

  const currentNet = point.earning - point.expenditure;
  const previousNet = previous ? previous.earning - previous.expenditure : null;

  const rate =
    previousNet && previousNet !== 0
      ? Math.abs(((currentNet - previousNet) / previousNet) * 100)
      : 0;
  const isGrowth = previousNet !== null ? currentNet >= previousNet : true;

  return (
    <div className="bg-statcard-background border border-statcard-border rounded-sm p-3 shadow-lg min-w-[180px]">
      <p className="text-xs font-semibold text-app-foreground mb-2">
        {format(new Date(point.date), "MMM d")}
      </p>
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[12px] text-statcard-label flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-chart-earning" />
            Earning
          </span>
          <span className="text-md font-medium text-app-foreground">
            Rs: {point.earning.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-[12px] text-statcard-label flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-chart-expenditure" />
            Expenditure
          </span>
          <span className="text-md font-medium text-app-foreground">
            Rs{point.expenditure.toLocaleString()}
          </span>
        </div>
      </div>

      {previous && (
        <div className="mt-2 pt-2 border-t border-statcard-border flex items-center justify-between">
          <span className="text-[11px] text-statcard-label">vs. last week</span>
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-medium px-1.5 py-0.5 rounded-full ${
              isGrowth
                ? "bg-status-approved-bg text-status-approved-text"
                : "bg-status-rejected-bg text-status-rejected-text"
            }`}
          >
            {isGrowth ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {rate.toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  );
}

export default function SalesOverviewChart() {
  const [period, setPeriod] = useState<SalesOverviewPeriod>("thisYear");
  const { data, isLoading } = useDashboardSalesOverviewQuery(period);

  return (
    <div className="bg-statcard-background border border-statcard-border rounded-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-app-foreground">
          Earning &amp; Expenditure Overview
        </h3>

        <Select
          value={period}
          onValueChange={(v) => setPeriod(v as SalesOverviewPeriod)}
        >
          <SelectTrigger
            className="w-36 h-8    rounded-md  bg-app-background border-app-border text-app-foreground  px-3.5 py-5 text-sm 
      transition-colors hover:border-gray-400"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-app-background border-app-border text-app-foreground p-2 space-y-2 ">
            <SelectItem value="thisYear" className={`${selectItemClass}`}>
              This year
            </SelectItem>
            <SelectItem
              value="previousYear"
              className={`${selectItemClass} mt-2`}
            >
              Previous year
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading || !data ? (
        <div className="h-64 flex items-center justify-center text-sm text-statcard-label">
          Loading...
        </div>
      ) : (
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <AreaChart
            data={data}
            margin={{ left: 12, right: 12, top: 8, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillEarning" x1="0" y1="0" x2="0" y2="1">
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
              <linearGradient id="fillExpenditure" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-expenditure)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-expenditure)"
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
              axisLine={true}
              tickMargin={8}
              interval={6}
              tick={{ fontSize: 11, fill: "var(--statcard-label)" }}
            />

            <ChartTooltip content={<CustomTooltip data={data} />} />

            <Area
              dataKey="earning"
              type="monotone"
              stroke="var(--chart-earning)"
              fill="url(#fillEarning)"
              strokeWidth={2}
            />
            <Area
              dataKey="expenditure"
              type="monotone"
              stroke="var(--chart-expenditure)"
              fill="url(#fillExpenditure)"
              strokeWidth={2}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      )}
    </div>
  );
}
