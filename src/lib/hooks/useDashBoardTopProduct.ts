// api/dashboard/dashboard.queries.ts
import dashboardServices from "@/services/dashboard/dashboard.services";
import { ITopProduct, TopProductsPeriod } from "@/types/dashboard/topProduct.types";
import { ProductStockStatus } from "@/types/product/productLive.types";
import { useQuery } from "@tanstack/react-query";


export function useTopProductsQuery(period: TopProductsPeriod, status: ProductStockStatus | "all") {
  return useQuery<ITopProduct[]>({
    queryKey: ["dashboard", "topProducts", period, status],
    queryFn: () => dashboardServices.getTopProducts(period, status),
  });
}