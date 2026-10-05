import {
  ISalesOverviewPoint,
  SalesOverviewPeriod,
} from "@/types/dashboard/salesOverview.types";
import { useQuery } from "@tanstack/react-query";
import { salesOverviewDemoData } from "../constants/dashboard/salesOverviewDemoData";

export function useDashboardSalesOverviewQuery(period: SalesOverviewPeriod) {
  return useQuery<ISalesOverviewPoint[]>({
    queryKey: ["salesOverview", period],
    queryFn: () => Promise.resolve(salesOverviewDemoData[period]),
  });
}
