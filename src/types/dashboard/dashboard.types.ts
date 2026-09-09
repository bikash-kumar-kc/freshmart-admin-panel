import type { LucideIcon } from "lucide-react";

export interface IKpiPeriodData {
  value: number;
  isGrowth: boolean;
  rate: number;
}

export interface IKpiCardData {
  kpi_card_name: string;
  week: IKpiPeriodData;
  month: IKpiPeriodData;
}

export type KpiPeriod = "week" | "month";

export interface IKpiCardConfig {
  key: string; // matches kpi_card_name for lookup against the data array
  label: string;
  icon: LucideIcon;
  iconBg: string;   // tinted icon-badge background
  iconColor: string; // icon color
  formatValue?: (value: number) => string; // e.g. currency formatting for Revenue
}