// // api/vendors/vendor.queries.ts (addition)
// import { useQuery } from "@tanstack/react-query";
// import { vendorKeys } from "./vendorList.queries";
// import { IVendorDetailResponse } from "@/types/vendors/vendorDetails.types";
// import { getVendorDetailDemoData } from "@/lib/constants/vendors/VendorDetailsDemoData";


// export function useVendorDetailQuery(farmId: string) {
//   return useQuery<IVendorDetailResponse>({
//     queryKey: [...vendorKeys.all, "detail", farmId],
//     queryFn: () => Promise.resolve(getVendorDetailDemoData(farmId)),
//   });
// }