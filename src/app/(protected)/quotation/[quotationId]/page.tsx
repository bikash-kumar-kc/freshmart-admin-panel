"use client";

import { useParams } from "next/navigation";

import { useQuotationDetailQuery } from "@/lib/hooks/quotation/quotationDetailsHook";
import { QuotationDetailsSection } from "./QuotationDetailSection";
import { QuotationVariantsDetail } from "./QuotationVarientsDetails";
import { QuotationDetailActionBar } from "./QuotationDetailActionBar";
import { QuotationDetailHeader } from "./QuotationDetailHeader";
import {
  useApproveQuotationMutation,
  useCancelQuotationMutation,
} from "@/lib/hooks/quotation/quotation.queries";

export default function QuotationDetailPage() {
  const { quotationId } = useParams<{ quotationId: string }>();

  const { data: quotation, isLoading } = useQuotationDetailQuery(quotationId);
  const cancel = useCancelQuotationMutation();
  const approve = useApproveQuotationMutation();

  if (isLoading || !quotation) {
    return <p className="text-sm text-app-muted-foreground">Loading...</p>;
  }

  return (
    <div className="space-y-5">
      <QuotationDetailHeader quotation={quotation} />
      <QuotationDetailsSection quotation={quotation} />
      <QuotationVariantsDetail
        variants={quotation.variants}
        showCounter={quotation.status === "countered"}
      />
      <QuotationDetailActionBar
        quotation={quotation}
        onCancel={() => cancel.mutateAsync(quotationId).catch(() => {})}
        onApprove={() => approve.mutateAsync(quotationId).catch(() => {})}
      />
    </div>
  );
}
