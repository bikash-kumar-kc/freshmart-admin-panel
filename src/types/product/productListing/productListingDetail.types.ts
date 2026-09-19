// products/productListingDetail.types.ts
import type {
  ProductListingStatus,
  ProductListingType,
} from "./productlisting.types";

export interface IProductVariantDetail {
  variantId: number;
  size: number;
  measurementUnit: string;
  quantity: number;
  pricePerUnit: number;
  sellingPrice: number | null; // null for display type
}

export interface IProductListingDetail {
  productId: string;
  vendorId: string;
  farmName: string;
  localName: string;
  category: string;
  packagingType: string;
  originCountry: string;
  description: string;
  keywords: string;
  type: ProductListingType;
  status: ProductListingStatus;
  images: string[];
  variants: IProductVariantDetail[];
  createdAt: string;
}
