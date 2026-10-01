// quotation/quotationTable.types.ts
export type QuotationPrimaryBucket = "approved" | "unapproved";

export type QuotationSubStatus =
  | "all"
  | "approved" | "delivered"
  | "pending" | "cancelled" | "rechecking" | "countered";

export interface IQuotationListRow {
  quotationId: string;
  farmName: string;
  productName: string; // includes variant in parens, from backend — e.g. "Apple (500g, 1000g)"
  requestedQuantity: number;
  status: Exclude<QuotationSubStatus, "all">;
  requestedBy: string; // vendor name
  createdBy: string; // admin name
  createdAt: string;
}

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