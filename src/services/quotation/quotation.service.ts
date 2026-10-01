import { quotationListDemoData } from "@/lib/constants/quotation/quotationDemoData";
import { IQuotationListQuery, IQuotationListResponse } from "@/types/quotation/quotation.types";


const approvedBucketStatuses = new Set(["approved", "delivered"]);

class QuotationListServices {
  async list(query: IQuotationListQuery): Promise<IQuotationListResponse> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    let filtered = quotationListDemoData.filter((q) =>
      query.bucket === "approved" ? approvedBucketStatuses.has(q.status) : !approvedBucketStatuses.has(q.status),
    );

    if (query.subStatus !== "all") {
      filtered = filtered.filter((q) => q.status === query.subStatus);
    }

    if (query.search?.trim()) {
      const s = query.search.trim().toLowerCase();
      filtered = filtered.filter((q) => q.quotationId.toLowerCase().includes(s));
    }

    if (query.search?.trim()) {
      return { data: filtered, total: filtered.length, page: 1, pageSize: filtered.length };
    }

    const start = (query.page - 1) * query.pageSize;
    return {
      data: filtered.slice(start, start + query.pageSize),
      total: filtered.length,
      page: query.page,
      pageSize: query.pageSize,
    };
  }
}

const quotationListServices = new QuotationListServices();
export default quotationListServices;