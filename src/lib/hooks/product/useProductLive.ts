// lib/hooks/product/useProductLive.ts
"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import productLiveServices from "@/services/product/productlive/productLive.service";
import { showToast } from "@/components/Toast";
import { getApiErrorMessage } from "@/lib/utilis/apiError";
import type { IProductLiveQuery } from "@/types/product/productLive.types";

export const productLiveKeys = {
  all: ["productLive"] as const,
  list: (q: IProductLiveQuery) => [...productLiveKeys.all, "list", q] as const,
  detail: (id: string) => [...productLiveKeys.all, "detail", id] as const,
};

export function useProductLiveQuery(query: IProductLiveQuery) {
  return useQuery({
    queryKey: productLiveKeys.list(query),
    queryFn: () => productLiveServices.list(query),
    placeholderData: keepPreviousData,
  });
}

export function useProductLiveDetailQuery(productId: string) {
  return useQuery({
    queryKey: productLiveKeys.detail(productId),
    queryFn: () => productLiveServices.getDetail(productId),
    enabled: !!productId,
  });
}

export function useUpdateProductLiveStatusMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, status }: { productId: string; status: "live" | "draft" }) =>
      productLiveServices.updateStatus(productId, status),
    onSuccess: (_data, { status }) =>
      status === "live"
        ? showToast.success("Product published", "It is now visible to customers.")
        : showToast.success("Moved to draft", "It is no longer visible to customers."),
    onError: (error) => showToast.error("Failed to update product", getApiErrorMessage(error)),
    onSettled: (_data, _error, { productId }) => {
      queryClient.invalidateQueries({ queryKey: [...productLiveKeys.all, "list"] });
      queryClient.invalidateQueries({ queryKey: productLiveKeys.detail(productId) });
    },
  });
}

export function useNotifyLiveVendorMutation() {
  return useMutation({
    mutationFn: (productId: string) => productLiveServices.notifyVendor(productId),
    onSuccess: () => showToast.success("Vendor notified", "They've been asked to update stock."),
    onError: (error) => showToast.error("Failed to notify vendor", getApiErrorMessage(error)),
  });
}