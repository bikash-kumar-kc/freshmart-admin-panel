
"use client";

import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useQuotationDetailQuery } from "@/lib/hooks/quotation/quotationDetailsHook";
import { QuotationDetailsSection } from "./QuotationDetailSection";
import { QuotationVariantsDetail } from "./QuotationVarientsDetails";
import { QuotationDetailActionBar } from "./QuotationDetailActionBar";
import { QuotationDetailHeader } from "./QuotationDetailHeader";

export default function QuotationDetailPage() {
  const { quotationId } = useParams<{ quotationId: string }>();
  const queryClient = useQueryClient();
  const { data: quotation, isLoading } = useQuotationDetailQuery(quotationId);

  function invalidate() {
    queryClient.invalidateQueries({
      queryKey: ["quotationDetail", quotationId],
    });
  }
  function handleCancel() {
    console.log("cancel quotation", quotationId);
    invalidate();
  }
  function handleApprove() {
    console.log("approve quotation", quotationId);
    invalidate();
  }

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
        onCancel={handleCancel}
        onApprove={handleApprove}
      />
    </div>
  );
}
