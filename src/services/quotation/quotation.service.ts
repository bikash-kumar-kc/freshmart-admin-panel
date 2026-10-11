// services/quotation/quotation.service.ts
import { api as client  } from "@/client/axios/client";
import type { IQuotationListQuery, IQuotationListResponse } from "@/types/quotation/quotation.types";
import type { IQuotationDetail } from "@/types/quotation/quotationDetails.types";

class QuotationServices {
  async list(query: IQuotationListQuery): Promise<IQuotationListResponse> {
    const { data } = await client.get("/admin-quotations", {
      params: { ...query, search: query.search || undefined },
    });
    return data;
  }

  async getDetail(quotationId: string): Promise<IQuotationDetail> {
    const { data } = await client.get(`/admin-quotations/${quotationId}`);
    return data;
  }

  async approve(quotationId: string) {
    console.log("we got it here....")
    const { data } = await client.patch(`/admin-quotations/${quotationId}/approve`);
    return data;
  }

  async cancel(quotationId: string) {
    const { data } = await client.patch(`/admin-quotations/${quotationId}/cancel`);
    return data;
  }
}

const quotationServices = new QuotationServices();
export default quotationServices;