
import { ITopProduct } from "../dashboard/topProduct.types";
import type { VendorStatus } from "./vendorList.types";


export interface IVendorDetail {
  farmId: string;
  vendorImage: string;
  farmOwner: string;
  status: VendorStatus;
  email: string;
  phone: string;
  farmName: string;
  farmOriginCountry: string;
  farmAddress: string;
  farmDescription: string;
  panVatCertificateUrl: string;
  organicCertificates: string[];
  createdAt: string;
}

export interface IVendorDetailResponse {
  vendor: IVendorDetail;
  popularProducts: ITopProduct[]; // only populated when status = approved
}