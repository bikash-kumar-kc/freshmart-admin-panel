// lib/hooks/vendor/vendorList.queries.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import vendorListServices from "@/services/Vendors/VendorList.service";
import { showToast } from "@/components/Toast";
import type { IVendorListQuery } from "@/types/vendors/vendorList.types";

export const vendorListKeys = {
  all: ["vendors"] as const,
  list: (q: IVendorListQuery) => [...vendorListKeys.all, "list", q] as const,
  detail: (id: string) => [...vendorListKeys.all, "detail", id] as const,
};

export function useVendorListQuery(query: IVendorListQuery) {
  return useQuery({
    queryKey: vendorListKeys.list(query),
    queryFn: () => vendorListServices.list(query),
  });
}

export function useVendorDetailQuery(farmId: string) {
  return useQuery({
    queryKey: vendorListKeys.detail(farmId),
    queryFn: () => vendorListServices.getDetail(farmId),
    enabled: !!farmId,
  });
}

function useInvalidateVendorQueries() {
  const queryClient = useQueryClient();
  return (farmId: string) => {
    queryClient.invalidateQueries({
      queryKey: [...vendorListKeys.all, "list"],
    });
    queryClient.invalidateQueries({ queryKey: vendorListKeys.detail(farmId) });
  };
}

export function useApproveVendorMutation() {
  const invalidate = useInvalidateVendorQueries();
  return useMutation({
    mutationFn: (farmId: string) => vendorListServices.approve(farmId),
    onSuccess: (_data, farmId) => {
      invalidate(farmId);
      showToast.success("Vendor approved", "The vendor can now list products.");
    },
  });
}

export function useUnapproveVendorMutation() {
  const invalidate = useInvalidateVendorQueries();
  return useMutation({
    mutationFn: (farmId: string) => vendorListServices.unapprove(farmId),
    onSuccess: (_data, farmId) => {
      invalidate(farmId);
      showToast.success(
        "Approval revoked",
        "The vendor can no longer list products.",
      );
    },
  });
}

export function useDeleteVendorMutation() {
  const invalidate = useInvalidateVendorQueries();
  return useMutation({
    mutationFn: (farmId: string) => vendorListServices.softDelete(farmId),
    onSuccess: (_data, farmId) => {
      invalidate(farmId);
      showToast.success(
        "Vendor deleted",
        "The vendor has been removed from active listings.",
      );
    },
  });
}
