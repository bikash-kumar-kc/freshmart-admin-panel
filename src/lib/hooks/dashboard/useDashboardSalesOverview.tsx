import { salesOverviewDemoData } from "@/lib/constants/dashboard/salesOverviewDemoData";
import {
  ISalesOverviewPoint,
  SalesOverviewPeriod,
} from "@/types/dashboard/salesOverview.types";
import { useQuery } from "@tanstack/react-query";


export function useDashboardSalesOverviewQuery(period: SalesOverviewPeriod) {
  return useQuery<ISalesOverviewPoint[]>({
    queryKey: ["salesOverview", period],
    queryFn: () => Promise.resolve(salesOverviewDemoData[period]),
  });
}
