import { IVendorDetailResponse } from "@/types/vendors/vendorDetails.types";
import { topProductsDemoData } from "../dashboard/topProductDemoData";

export function getVendorDetailDemoData(farmId: string): IVendorDetailResponse {
  return {
    vendor: {
      farmId,
      vendorImage:
        "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=600&q=80",
      farmOwner: "Ram Bahadur Thapa",
      status: "approved",
      email: "vendor@example.com",
      phone: "+977-9800000000",
      farmName: "Sunrise Organic Farm",
      farmOriginCountry: "Nepal",
      farmAddress:
        "Ward 5, Bhaktapur Municipality, Bhaktapur, Bagmati Province, Nepal",
      farmDescription:
        "Family-run organic farm since 2010, specializing in seasonal vegetables and dairy.",
      panVatCertificateUrl: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=600&q=80",
      organicCertificates: [
        "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=600&q=80",
        "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=600&q=80",
      ],
      createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    },
    popularProducts: topProductsDemoData.slice(0, 5),
  };
}
