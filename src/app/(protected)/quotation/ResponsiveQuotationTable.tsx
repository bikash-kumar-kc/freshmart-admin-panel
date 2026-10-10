// quotation/ResponsiveQuotationListTable.tsx
"use client";

import QuotationListTable from "./QuotationListTable";
import QuotationListCard from "./QuotationListCard";
import { IQuotationListRow } from "@/types/quotation/quotation.types";
import { useIsMobile } from "@/lib/hooks/useMobileHook";

export default function ResponsiveQuotationListTable(props: {
  data: IQuotationListRow[];
  isLoading: boolean;
  onCancel: (id: string) => void;
  onApprove: (id: string) => void;
}) {
  console.log("data");
  console.log(props.data);
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="space-y-3">
        {props.isLoading ? (
          <p className="text-sm text-app-muted-foreground text-center py-6">
            Loading...
          </p>
        ) : props.data.length === 0 ? (
          <p className="text-sm text-app-muted-foreground text-center py-6">
            No quotations found.
          </p>
        ) : (
          props.data.map((q) => (
            <QuotationListCard
              key={q.quotationId}
              quotation={q}
              onCancel={props.onCancel}
              onApprove={props.onApprove}
            />
          ))
        )}
      </div>
    );
  }

  return <QuotationListTable {...props} />;
}
