
import createQuotationServices from "@/services/quotation/createquotation.service";
import type{ ICreateQuotationPayload } from "@/types/quotation/createquotation.types";
import { useQuery, useMutation } from "@tanstack/react-query";


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

// Fires one POST per product, per the "new quotation for each product" rule
export function useCreateQuotationMutation() {
  return useMutation({
    mutationFn: async (payloads: ICreateQuotationPayload[]) => {
      return Promise.all(payloads.map((p) => createQuotationServices.create(p)));
    },
  });
}