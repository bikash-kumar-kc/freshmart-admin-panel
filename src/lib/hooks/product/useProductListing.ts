// api/products/productListing.queries.ts
import productListingServices from "@/services/product/productListing/productListing.service";
import { IProductListingQuery } from "@/types/product/productListing/productlisting.types";
import { useQuery } from "@tanstack/react-query";

export const productListingKeys = {
  all: ["productListing"] as const,
  list: (query: IProductListingQuery) =>
    [...productListingKeys.all, "list", query] as const,
};

export function useProductListingQuery(query: IProductListingQuery) {
  return useQuery({
    queryKey: productListingKeys.list(query),
    queryFn: () => productListingServices.list(query),
  });
}
