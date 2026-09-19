import { IProductListingDetail } from "@/types/product/productListing/productListingDetail.types";

export function getProductListingDetailDemoData(
  productId: string,
): IProductListingDetail {
  return {
    productId,
    vendorId: "FM-1000",
    farmName: "Sunrise Organic Farm",
    localName: "Apple",
    category: "Fruits",
    packagingType: "Carton",
    originCountry: "Nepal",
    description:
      "Freshly harvested organic apples, hand-picked and sorted for quality.",
    keywords: "apple, fruit, organic, fresh",
    type: "inventory",
    status: "unapproved",
    images: [
      "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=600&q=80",
      "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=600&q=80",
      "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=600&q=80",
    ],
    variants: [
      {
        variantId: 1,
        size: 500,
        measurementUnit: "g",
        quantity: 100,
        pricePerUnit: 250,
        sellingPrice: 300,
      },
      {
        variantId: 2,
        size: 1000,
        measurementUnit: "g",
        quantity: 50,
        pricePerUnit: 450,
        sellingPrice: 550,
      },
      {
        variantId: 3,
        size: 2000,
        measurementUnit: "g",
        quantity: 20,
        pricePerUnit: 850,
        sellingPrice: 1000,
      },
    ],
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  };
}
