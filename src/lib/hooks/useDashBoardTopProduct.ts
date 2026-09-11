import {
  ITopProduct,
  ProductStockStatus,
  TopProductsPeriod,
} from "@/types/dashboard/topProduct.types";
import { useQuery } from "@tanstack/react-query";
import { topProductsDemoData } from "../constants/dashboard/topProductDemoData";

export function useTopProductsQuery(
  period: TopProductsPeriod,
  statusFilter: ProductStockStatus | "all",
) {
  return useQuery<ITopProduct[]>({
    queryKey: ["topProducts", period, statusFilter],
    queryFn: () =>
      Promise.resolve(
        statusFilter === "all"
          ? topProductsDemoData
          : topProductsDemoData.filter((p) => p.status === statusFilter),
      ),
  });
}
