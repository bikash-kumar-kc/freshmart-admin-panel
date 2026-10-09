// services/product/productlive/productLive.service.ts
import { api as client } from "@/client/axios/client";
import type { IProductLiveQuery, IProductLiveResponse } from "@/types/product/productLive.types";
import type { IProductLiveDetail } from "@/types/product/productLiveDetails.types";

class ProductLiveServices {
  async list(query: IProductLiveQuery): Promise<IProductLiveResponse> {
    const { data } = await client.get("/admin/products/live", {
      params: { ...query, search: query.search || undefined },
    });
    return data;
  }

  async getDetail(productId: string): Promise<IProductLiveDetail> {
    const { data } = await client.get(`/admin/products/live/${productId}`);
    return data;
  }

  async updateStatus(productId: string, status: "live" | "draft") {
    const { data } = await client.patch(`/admin/products/live/${productId}/status`, { status });
    return data;
  }

  async notifyVendor(productId: string) {
    const { data } = await client.post(`/admin/products/live/${productId}/notify-vendor`);
    return data;
  }
}

const productLiveServices = new ProductLiveServices();
export default productLiveServices;