import { useState } from "react";
import { MoreVertical, TrendingUp, TrendingDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/components/ui/dropdown-menu";
import {
  IKpiCardConfig,
  IKpiCardData,
  KpiPeriod,
} from "@/types/dashboard/dashboard.types";

interface KpiCardProps {
  config: IKpiCardConfig;
  data: IKpiCardData;
}

export default function KpiCard({ config, data }: KpiCardProps) {
  const [period, setPeriod] = useState<KpiPeriod>("week");
  const Icon = config.icon;
  const periodData = data[period];

  const displayValue = config.formatValue
    ? config.formatValue(periodData.value)
    : periodData.value.toLocaleString();

  return (
    <div className="bg-statcard-background border border-statcard-border rounded-sm p-4 hover:shadow-[0_2px_8px_var(--statcard-shadow-hover)] transition-shadow shadow-card">
      <div className="flex items-start justify-between gap-3.5">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0"
            style={{ backgroundColor: config.iconBg }}
          >
            <Icon size={16} style={{ color: config.iconColor }} />
          </div>
          <p className="text-sm font-medium text-statcard-label">
            {config.label}
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-statcard-label hover:text-app-foreground transition-colors p-1 -m-1 rounded-sm">
              <MoreVertical size={16} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-36 bg-app-background border-app-border flex flex-col gap-2"
          >
            <DropdownMenuItem
              onClick={() => setPeriod("week")}
              className={`px-2 py-2 ${period === "week" ? "bg-button-secondary-bg text-button-secondary-text focus:bg-button-secondary-bg focus:text-button-secondary-text " : "focus:bg-[#262626] focus:text-button-secondary-text text-button-secondary-text"}   rounded-sm active:bg-transparent active:scale-100 `}
            >
              Last week
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setPeriod("month")}
              className={`px-2 py-2 ${period === "month" ? "bg-button-secondary-bg text-button-secondary-text focus:bg-button-secondary-bg focus:text-button-secondary-text " : "focus:bg-[#262626] focus:text-button-secondary-text text-button-secondary-text"}   rounded-sm active:bg-transparent active:scale-100 `}
            >
              Last month
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="text-2xl font-semibold text-statcard-value mt-3">
        {displayValue}
      </p>

      <div className="flex items-center gap-2 mt-1.5">
        <p className="text-xs text-statcard-label">From last {period}</p>
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-medium px-1.5 py-0.5 rounded-full ${
            periodData.isGrowth
              ? "bg-status-approved-bg text-status-approved-text"
              : "bg-status-rejected-bg text-status-rejected-text"
          }`}
        >
          {periodData.isGrowth ? (
            <TrendingUp size={11} />
          ) : (
            <TrendingDown size={11} />
          )}
          {periodData.rate}%
        </span>
      </div>
    </div>
  );
}
