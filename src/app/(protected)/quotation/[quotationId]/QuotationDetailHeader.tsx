import { quotationStatusConfig } from "@/lib/constants/quotation/quotationStatus";
import type { IQuotationDetail } from "@/types/quotation/quotationDetails.types";

export function QuotationDetailHeader({
  quotation,
}: {
  quotation: IQuotationDetail;
}) {
  const status = quotationStatusConfig[quotation.status];

  return (
    <div className="bg-statcard-background border border-statcard-border rounded-sm p-5 flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h1 className="text-lg font-semibold text-app-foreground">
          {quotation.quotationId}
        </h1>
        <p className="text-xs text-app-muted-foreground mt-0.5">
          {quotation.productName}
        </p>
      </div>

      <span
        className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${status.badgeClass}`}
      >
        {status.label}
      </span>
    </div>
  );
}
