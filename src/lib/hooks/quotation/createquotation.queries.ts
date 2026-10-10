// lib/hooks/quotation/createquotation.queries.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import createQuotationServices from "@/services/quotation/createquotation.service";
import { quotationKeys } from "./quotation.queries";
import { showToast } from "@/components/Toast";
import { getApiErrorMessage } from "@/lib/utilis/apiError";
import { ICreateQuotationsPayload } from "@/types/quotation/quotation.types";


export const createQuotationKeys = {
  vendors: ["createQuotation", "vendors"] as const,
  products: (vendorId: string) => ["createQuotation", "products", vendorId] as const,
};

export function useApprovedVendorsQuery() {
  return useQuery({
    queryKey: createQuotationKeys.vendors,
    queryFn: () => createQuotationServices.getApprovedVendors(),
  });
}

export function useApprovedProductsByVendorQuery(vendorId: string | null) {
  return useQuery({
    queryKey: createQuotationKeys.products(vendorId ?? ""),
    queryFn: () => createQuotationServices.getApprovedProductsByVendor(vendorId!),
    enabled: !!vendorId,
  });
}

export function useCreateQuotationsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ICreateQuotationsPayload) => createQuotationServices.create(payload),
    onSuccess: (_data, payload) => {
      queryClient.invalidateQueries({ queryKey: [...quotationKeys.all, "list"] });
      const n = payload.quotations.length;
      showToast.success("Quotations sent", `${n} quotation${n > 1 ? "s" : ""} sent to the vendor.`);
    },
    onError: (error) => showToast.error("Failed to create quotations", getApiErrorMessage(error)),
  });
}