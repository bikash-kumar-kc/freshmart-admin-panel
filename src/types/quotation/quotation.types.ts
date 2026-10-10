// quotation/quotationTable.types.ts
export type QuotationPrimaryBucket = "approved" | "unapproved";

export type QuotationSubStatus =
  | "all"
  | "approved" | "delivered"
  | "pending" | "cancelled" | "rechecking" | "countered";

// export interface IQuotationListRow {
//   quotationId: string;
//   farmName: string;
//   productName: string; // includes variant in parens, from backend — e.g. "Apple (500g, 1000g)"
//   requestedQuantity: number;
//   status: Exclude<QuotationSubStatus, "all">;
//   requestedBy: string; // vendor name
//   createdBy: string; // admin name
//   createdAt: string;
// }

export interface IQuotationListQuery {
  bucket: QuotationPrimaryBucket;
  subStatus: QuotationSubStatus;
  search?: string;
  page: number;
  pageSize: number;
}

export interface IQuotationListResponse {
  data: IQuotationListRow[];
  total: number;
  page: number;
  pageSize: number;
}

// types/quotation/quotation.types.ts
export interface IQuotationListRow {
  quotationId: string;
  farmName: string;
  productName: string;        // "Apple (500g, 1000g)"
  requestedQuantity: string;  // "100" or "(100, 50)"
  status: Exclude<QuotationSubStatus, "all">;
  createdBy: string;
  createdAt: string;          // requestedBy is gone
}

// types/quotation/createquotation.types.ts
export interface ICreateQuotationsPayload {
  vendorId: string;
  quotations: {
    productListingId: string;
    variants: { variantId: string; adminSuggested: number; quantity: number }[];
  }[];
}