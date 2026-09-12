// api/vendors/vendor.queries.ts
import vendorServices from "@/services/Vendors/VendorList.service";
import { IVendorListQuery } from "@/types/vendors/vendorList.types";
import { useQuery } from "@tanstack/react-query";


export const vendorKeys = {
  all: ["vendors"] as const,
  list: (query: IVendorListQuery) => [...vendorKeys.all, "list", query] as const,
};

export function useVendorListQuery(query: IVendorListQuery) {
  return useQuery({
    queryKey: vendorKeys.list(query),
    queryFn: () => vendorServices.list(query),
  });
}