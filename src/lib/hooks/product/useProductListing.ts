// api/products/productListing.queries.ts
import { getProductListingDetailDemoData } from "@/lib/constants/products/productListingDetailDemoData";
import productListingServices from "@/services/product/productListing/productListing.service";
import { IProductListingQuery } from "@/types/product/productListing/productlisting.types";
import { IProductListingDetail } from "@/types/product/productListing/productListingDetail.types";
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


export function useProductListingDetailQuery(productId: string) {
  return useQuery<IProductListingDetail>({
    queryKey: [...productListingKeys.all, "detail", productId],
    queryFn: () => Promise.resolve(getProductListingDetailDemoData(productId)),
  });
}