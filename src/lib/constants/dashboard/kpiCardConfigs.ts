
import { IKpiCardConfig } from "@/types/dashboard/dashboard.types";
import { DollarSign, ShoppingCart, PackageCheck, RotateCcw, Users } from "lucide-react";


export const kpiCardConfigs: IKpiCardConfig[] = [
  {
    key: "Total Revenue",
    label: "Total Revenue",
    icon: DollarSign,
    iconBg: "var(--brand-primary-soft)",
    iconColor: "var(--brand-primary)",
    formatValue: (v) => `$${v.toLocaleString()}`,
  },
  {
    key: "Total Orders",
    label: "Total Orders",
    icon: ShoppingCart,
    iconBg: "var(--status-inprogress-bg)",
    iconColor: "var(--status-inprogress-text)",
  },
  {
    key: "Total Delivered",
    label: "Total Delivered",
    icon: PackageCheck,
    iconBg: "var(--status-approved-bg)",
    iconColor: "var(--status-approved-text)",
  },
  {
    key: "Refund",
    label: "Refund",
    icon: RotateCcw,
    iconBg: "var(--status-rejected-bg)",
    iconColor: "var(--status-rejected-text)",
  },
  {
    key: "Active Users",
    label: "Active Users",
    icon: Users,
    iconBg: "var(--brand-cta-soft)",
    iconColor: "var(--brand-cta)",
  },
];