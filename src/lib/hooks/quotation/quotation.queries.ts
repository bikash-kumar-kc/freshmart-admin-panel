// lib/hooks/quotation/quotation.queries.ts
"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import quotationServices from "@/services/quotation/quotation.service";
import { showToast } from "@/components/Toast";
import { getApiErrorMessage } from "@/lib/utilis/apiError";
import type { IQuotationListQuery } from "@/types/quotation/quotation.types";

export const quotationKeys = {
  all: ["quotations"] as const,
  list: (q: IQuotationListQuery) => [...quotationKeys.all, "list", q] as const,
  detail: (id: string) => [...quotationKeys.all, "detail", id] as const,
};

export function useQuotationListQuery(query: IQuotationListQuery) {
  return useQuery({
    queryKey: quotationKeys.list(query),
    queryFn: () => quotationServices.list(query),
    placeholderData: keepPreviousData,
  });
}

export function useQuotationDetailQuery(quotationId: string) {
  return useQuery({
    queryKey: quotationKeys.detail(quotationId),
    queryFn: () => quotationServices.getDetail(quotationId),
    enabled: !!quotationId,
  });
}

function useRefreshQuotations() {
  const queryClient = useQueryClient();
  return (quotationId: string) => {
    queryClient.invalidateQueries({ queryKey: [...quotationKeys.all, "list"] });
    queryClient.invalidateQueries({ queryKey: quotationKeys.detail(quotationId) });
  };
}

export function useApproveQuotationMutation() {
  const refresh = useRefreshQuotations();
  return useMutation({
    mutationFn: (quotationId: string) => quotationServices.approve(quotationId),
    onSuccess: () => {
      showToast.success("Quotation approved", "The vendor has been notified.")

    },
    onError: (error) => showToast.error("Failed to approve quotation", getApiErrorMessage(error)),
    onSettled: (_data, _error, quotationId) => {
      refresh(quotationId)  
    }, // refetch even on a conflict
  });
}

export function useCancelQuotationMutation() {
  const refresh = useRefreshQuotations();
  return useMutation({
    mutationFn: (quotationId: string) => quotationServices.cancel(quotationId),
    onSuccess: () => showToast.success("Quotation cancelled", "The vendor has been notified."),
    onError: (error) => showToast.error("Failed to cancel quotation", getApiErrorMessage(error)),
    onSettled: (_data, _error, quotationId) => refresh(quotationId),
  });
}