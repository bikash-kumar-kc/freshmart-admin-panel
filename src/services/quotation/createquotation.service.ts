
// services/quotation/createquotation.service.ts
import { api as client } from "@/client/axios/client";
import type {
  IApprovedVendorOption, IApprovedProductOption,
} from "@/types/quotation/createquotation.types";
import { ICreateQuotationsPayload } from "@/types/quotation/quotation.types";

class CreateQuotationServices {
  async getApprovedVendors(): Promise<IApprovedVendorOption[]> {
    const { data } = await client.get("/admin-quotations/options/vendors");
    return data;
  }

  async getApprovedProductsByVendor(vendorId: string): Promise<IApprovedProductOption[]> {
    const { data } = await client.get(`/admin-quotations/options/vendors/${vendorId}/products`);
    return data;
  }

  async create(payload: ICreateQuotationsPayload) {
    const { data } = await client.post("/admin-quotations", payload);
    return data;
  }
}

const createQuotationServices = new CreateQuotationServices();
export default createQuotationServices;