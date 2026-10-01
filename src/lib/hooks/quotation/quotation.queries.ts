// api/quotation/quotationList.queries.ts
import quotationListServices from "@/services/quotation/quotation.service";
import { IQuotationListQuery } from "@/types/quotation/quotation.types";
import { useQuery } from "@tanstack/react-query";


export const quotationListKeys = {
  all: ["quotationList"] as const,
  list: (query: IQuotationListQuery) => ["list", query] as const,
};

export function useQuotationListQuery(query: IQuotationListQuery) {
  return useQuery({
    queryKey: quotationListKeys.list(query),
    queryFn: () => quotationListServices.list(query),
  });
}