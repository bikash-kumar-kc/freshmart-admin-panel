// lib/hooks/product/useProductListing.ts
"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import productListingServices from "@/services/product/productListing/productListing.service";
import { showToast } from "@/components/Toast";
import { getApiErrorMessage } from "@/lib/utilis/apiError";
import type { IProductListingQuery } from "@/types/product/productListing/productlisting.types";

export const productListingKeys = {
  all: ["productListing"] as const,
  list: (q: IProductListingQuery) => [...productListingKeys.all, "list", q] as const,
  detail: (id: string) => [...productListingKeys.all, "detail", id] as const,
};

export function useProductListingQuery(query: IProductListingQuery) {
  return useQuery({
    queryKey: productListingKeys.list(query),
    queryFn: () => productListingServices.list(query),
    placeholderData: keepPreviousData,
  });
}

export function useProductListingDetailQuery(productId: string) {
  return useQuery({
    queryKey: productListingKeys.detail(productId),
    queryFn: () => productListingServices.getDetail(productId),
    enabled: !!productId,
  });
}

export function useApproveProductListingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => productListingServices.approve(productId),
    onSuccess: () => showToast.success("Product approved", "The listing is now approved."),
    onError: (error) => showToast.error("Failed to approve product", getApiErrorMessage(error)),
    onSettled: (_data, _error, productId) => {
      queryClient.invalidateQueries({ queryKey: [...productListingKeys.all, "list"] });
      queryClient.invalidateQueries({ queryKey: productListingKeys.detail(productId) });
    },
  });
}

export function useNotifyListingVendorMutation() {
  return useMutation({
    mutationFn: (productId: string) => productListingServices.notifyVendor(productId),
    onSuccess: () => showToast.success("Vendor notified", "They've been asked to update stock."),
    onError: (error) => showToast.error("Failed to notify vendor", getApiErrorMessage(error)),
  });
}