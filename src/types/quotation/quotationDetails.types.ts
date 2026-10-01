import type { QuotationSubStatus } from "./quotation.types";

export interface IQuotationVariantDetail {
  variantId: string;
  size: string; // pre-formatted, e.g. "500g"
  actualPrice: number;
  requestedPrice: number; // admin's suggested price
  counterPrice: number | null; // vendor's counter, null unless status = countered
}

export interface IQuotationDetail {
  quotationId: string;
  vendorId: string;
  farmName: string;
  productListingId: string;
  productName: string;
  status: Exclude<QuotationSubStatus, "all">;
  variants: IQuotationVariantDetail[];
  createdAt: string;
}
