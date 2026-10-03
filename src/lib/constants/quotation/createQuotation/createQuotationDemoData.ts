import type {
  IApprovedProductOption,
  IApprovedVendorOption,
} from "@/types/quotation/createquotation.types";

export const approvedVendorsDemoData: IApprovedVendorOption[] = [
  { vendorId: "FM-1000", farmName: "Sunrise Organic Farm", status: "approved" },
  { vendorId: "FM-1001", farmName: "Green Valley Farm", status: "approved" },
  { vendorId: "FM-1031", farmName: "Himalayan Dairy", status: "approved" },
];

const productsByVendor: Record<string, IApprovedProductOption[]> = {
  "FM-1000": [
    {
      vendorId: "FM-1000",
      productListingId: "PL-2001",
      productName: "Apple",
      status: "approved",
      type: "inventory",
      variants: [
        { variantId: "V-1", size: "500g", actualPrice: 250 },
        { variantId: "V-2", size: "1000g", actualPrice: 450 },
      ],
    },
    {
      vendorId: "FM-1000",
      productListingId: "PL-2002",
      productName: "Spinach",
      status: "approved",
      type: "inventory",
      variants: [{ variantId: "V-3", size: "250g", actualPrice: 80 }],
    },
  ],
  "FM-1001": [
    {
      vendorId: "FM-1001",
      productListingId: "PL-2010",
      productName: "Tomato",
      status: "approved",
      type: "inventory",
      variants: [
        { variantId: "V-10", size: "500g", actualPrice: 120 },
        { variantId: "V-11", size: "1000g", actualPrice: 220 },
      ],
    },
  ],
  "FM-1002": [
    {
      vendorId: "FM-1002",
      productListingId: "PL-2020",
      productName: "Milk",
      status: "approved",
      type: "inventory",
      variants: [{ variantId: "V-20", size: "1L", actualPrice: 90 }],
    },
  ],
};

export function getApprovedProductsByVendorDemoData(
  vendorId: string,
): IApprovedProductOption[] {
  return productsByVendor[vendorId] ?? [];
}
