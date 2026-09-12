// vendors/vendorList.types.ts
export type VendorStatus = "approved" | "unapproved" | "deleted";

export interface IVendorLocation {
  ward: string;
  municipality: string;
  district: string;
  province: string;
  country: string;
}

export interface IVendorListItem {
  farmId: string;
  farmName: string;
  location: IVendorLocation;
  email: string;
  phone: string;
  status: VendorStatus;
  createdAt: string; // ISO
}

export interface IVendorListQuery {
  search?: string;
  status: VendorStatus | "all";
  page: number;
  pageSize: number;
}

export interface IVendorListResponse {
  data: IVendorListItem[];
  total: number;
  page: number;
  pageSize: number;
}