// api/products/productLive.queries.ts
import productLiveServices from "@/services/product/productlive/productLive.service";
import { IProductLiveQuery } from "@/types/product/productLive.types";
import { useQuery } from "@tanstack/react-query";


export const productLiveKeys = {
  all: ["productLive"] as const,
  list: (query: IProductLiveQuery) => [...productLiveKeys.all, "list", query] as const,
};

export function useProductLiveQuery(query: IProductLiveQuery) {
  return useQuery({
    queryKey: productLiveKeys.list(query),
    queryFn: () => productLiveServices.list(query),
  });
}