// api/quotation/quotationDetail.queries.ts
import { getQuotationDetailDemoData } from "@/lib/constants/quotation/quotationDetails/quotationDetailsDemoData";
import type { IQuotationDetail } from "@/types/quotation/quotationDetails.types";
import { useQuery } from "@tanstack/react-query";

export function useQuotationDetailQuery(quotationId: string) {
  return useQuery<IQuotationDetail>({
    queryKey: ["quotationDetail", quotationId],
    queryFn: () => Promise.resolve(getQuotationDetailDemoData(quotationId)),
  });
}
