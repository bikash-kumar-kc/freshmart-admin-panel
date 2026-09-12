import { vendorListDemoData } from "@/lib/constants/vendors/VendorListDemoData";
import { IVendorListQuery, IVendorListResponse } from "@/types/vendors/vendorList.types";


class VendorServices {
  async list(query: IVendorListQuery): Promise<IVendorListResponse> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    let filtered = vendorListDemoData;

    // Deleted vendors are excluded unless explicitly selected
    if (query.status === "all") {
      filtered = filtered.filter((v) => v.status !== "deleted");
    } else {
      filtered = filtered.filter((v) => v.status === query.status);
    }

    if (query.search?.trim()) {
      const q = query.search.trim().toLowerCase();
      filtered = filtered.filter(
        (v) =>
          v.farmId.toLowerCase().includes(q) ||
          v.farmName.toLowerCase().includes(q),
      );
    }

    // Search results are returned in full, no pagination — matches "no pagination while searching"
    if (query.search?.trim()) {
      return {
        data: filtered,
        total: filtered.length,
        page: 1,
        pageSize: filtered.length,
      };
    }

    const start = (query.page - 1) * query.pageSize;
    const paginated = filtered.slice(start, start + query.pageSize);

    return {
      data: paginated,
      total: filtered.length,
      page: query.page,
      pageSize: query.pageSize,
    };
  }
}

const vendorServices = new VendorServices();
export default vendorServices;
