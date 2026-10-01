import { IVendorAction } from "@/app/(protected)/vendors/vendorAction";
import { IQuotationListRow } from "@/types/quotation/quotation.types";

export function getQuotationListActions(
  quotation: IQuotationListRow,
  handlers: { onCancel: (id: string) => void; onApprove: (id: string) => void },
): IVendorAction[] {
  switch (quotation.status) {
    case "pending":
      return [
        {
          actionName: "Cancel",
          confirmMessage: `Cancel quotation ${quotation.quotationId}?`,
          variant: "destructive",
          method: () => handlers.onCancel(quotation.quotationId),
        },
      ];
    case "rechecking":
    case "countered":
      return [
        {
          actionName: "Cancel",
          confirmMessage: `Cancel quotation ${quotation.quotationId}?`,
          variant: "destructive",
          method: () => handlers.onCancel(quotation.quotationId),
        },
        {
          actionName: "Approve",
          confirmMessage: `Approve quotation ${quotation.quotationId} at the vendor's current terms?`,
          method: () => handlers.onApprove(quotation.quotationId),
        },
      ];
    default: // cancelled, approved, delivered
      return [];
  }
}
