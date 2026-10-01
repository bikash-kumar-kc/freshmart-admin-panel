// quotation/createQuotation.types.ts
export interface IApprovedVendorOption {
  vendorId: string;
  farmName: string;
  status: "approved";
}

export interface IProductVariantOption {
  variantId: string;
  size: string; // pre-formatted, e.g. "500g"
  actualPrice: number;
}

export interface IApprovedProductOption {
  vendorId: string;
  productListingId: string;
  productName: string;
  status: "approved";
  type: "inventory";
  variants: IProductVariantOption[];
}

export interface ICreateQuotationVariantPayload {
  variantId: string;
  adminSuggested: number;
  quantity: number;
}

export interface ICreateQuotationPayload {
  vendorId: string;
  adminId: string;
  productListingId: string;
  variants: ICreateQuotationVariantPayload[];
}