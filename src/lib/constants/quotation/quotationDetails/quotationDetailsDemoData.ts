import { QuotationSubStatus } from "@/types/quotation/quotation.types";
import { IQuotationDetail } from "@/types/quotation/quotationDetails.types";


export function getQuotationDetailDemoData(
  quotationId: string,
  status: Exclude<QuotationSubStatus, "all"> = "countered",
): IQuotationDetail {
  return {
    quotationId,
    vendorId: "FM-1000",
    farmName: "Sunrise Organic Farm",
    productListingId: "PL-2001",
    productName: "Apple",
    status,
    variants: [
      {
        variantId: "V-1",
        size: "500g",
        actualPrice: 250,
        requestedPrice: 220,
        counterPrice: status === "countered" ? 235 : null,
      },
      {
        variantId: "V-2",
        size: "1000g",
        actualPrice: 450,
        requestedPrice: 400,
        counterPrice: status === "countered" ? 425 : null,
      },
    ],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  };
}