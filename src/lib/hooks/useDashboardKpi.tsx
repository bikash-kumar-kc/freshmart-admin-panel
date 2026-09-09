// api/dashboard/dashboard.queries.ts
import { IKpiCardData } from "@/types/dashboard/dashboard.types";
import { useQuery } from "@tanstack/react-query";
import { kpiDemoData } from "../constants/dashboard/kpiCardInfo";


export const dashboardKeys = {
  all: ["dashboard"] as const,
  kpis: () => [...dashboardKeys.all, "kpis"] as const,
};

export function useDashboardKpisQuery() {
  return useQuery<IKpiCardData[]>({
    queryKey: dashboardKeys.kpis(),
    queryFn: () => Promise.resolve(kpiDemoData), // swap for a real API call later
  });
}