// quotation/QuotationListCard.tsx
"use client";

import { useRouter } from "next/navigation";
import { ListCard } from "@/components/ListCard";
import { IQuotationListRow } from "@/types/quotation/quotation.types";
import { quotationStatusConfig } from "@/lib/constants/quotation/quotationStatus";
import { formatTimestamp } from "@/lib/utilis/timeFormatter";
import { getQuotationListActions } from "@/lib/constants/quotation/quotationListAction";


const variantMap: Record<string, "approved" | "awaiting" | "rejected" | "inprogress"> = {
  approved: "approved",
  delivered: "approved",
  pending: "awaiting",
  cancelled: "rejected",
  rechecking: "inprogress",
  countered: "inprogress",
};

export default function QuotationListCard({
  quotation,
  onCancel,
  onApprove,
}: {
  quotation: IQuotationListRow;
  onCancel: (id: string) => void;
  onApprove: (id: string) => void;
}) {
  const router = useRouter();

  return (
    <ListCard
      title={quotation.productName}
      status={{ label: quotationStatusConfig[quotation.status].label, variant: variantMap[quotation.status] }}
      facts={[quotation.farmName, `Qty: ${quotation.requestedQuantity}`, quotation.quotationId]}
      meta={formatTimestamp(quotation.createdAt)}
      onClick={() => router.push(`/quotation/${quotation.quotationId}`)}
      actions={getQuotationListActions(quotation, { onCancel, onApprove })}
    />
  );
}