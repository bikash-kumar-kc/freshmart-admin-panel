import { approvedVendorsDemoData, getApprovedProductsByVendorDemoData } from "@/lib/constants/quotation/createQuotation/createQuotationDemoData";
import { ICreateQuotationPayload } from "@/types/quotation/createquotation.types";


class CreateQuotationServices {
  async getApprovedVendors() {
    await new Promise((r) => setTimeout(r, 200));
    return approvedVendorsDemoData;
  }

  async getApprovedProductsByVendor(vendorId: string) {
    await new Promise((r) => setTimeout(r, 200));
    return getApprovedProductsByVendorDemoData(vendorId);
  }

  async create(payload: ICreateQuotationPayload) {
    await new Promise((r) => setTimeout(r, 300));
    console.log("POST /admin/quotation", payload);
    return { success: true };
  }
}

const createQuotationServices = new CreateQuotationServices();
export default createQuotationServices;