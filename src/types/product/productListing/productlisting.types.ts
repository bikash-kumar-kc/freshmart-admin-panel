// products/productListingTable.types.ts
export type ProductListingStatus = "approved" | "unapproved";
export type ProductListingType = "inventory" | "display";
export type CreatedAtSort = "new_to_old" | "old_to_new";

export interface IProductListingRow {
  vendorId:string;
  productId: string;
  farmName: string;
  productName: string; // pre-formatted by the API, e.g. "Apple (500g)"
  localName: string;
  type: ProductListingType;
  quantity: number;
  unitPrice: number;
  status: ProductListingStatus;
  createdAt: string; // ISO
}

export interface IProductListingFilters {
  status: ProductListingStatus | "all";
  type: ProductListingType | "all";
  sort: CreatedAtSort;
}

export interface IProductListingQuery extends IProductListingFilters {
  search?: string;
  page: number;
  pageSize: number;
}

export interface IProductListingResponse {
  data: IProductListingRow[];
  total: number;
  page: number;
  pageSize: number;
}