// services/product/productListing/productListing.service.ts
import { api as client } from "@/client/axios/client";
import type {
  IProductListingQuery,
  IProductListingResponse,
} from "@/types/product/productListing/productlisting.types";
import type { IProductListingDetail } from "@/types/product/productListing/productListingDetail.types";

class ProductListingServices {
  async list(query: IProductListingQuery): Promise<IProductListingResponse> {
    const { data } = await client.get("/admin-product-listing", {
      params: { ...query, search: query.search || undefined },
    });
    return data;
  }

  async getDetail(productId: string): Promise<IProductListingDetail> {
    const { data } = await client.get(`/admin-product-listing/${productId}`);
    return data;
  }

  async approve(productId: string) {
    const { data } = await client.patch(
      `/admin/product-listing/${productId}/approve`,
    );
    return data;
  }

  async notifyVendor(productId: string) {
    const { data } = await client.post(
      `/admin/product-listing/${productId}/notify-vendor`,
    );
    return data;
  }
}

const productListingServices = new ProductListingServices();
export default productListingServices;
