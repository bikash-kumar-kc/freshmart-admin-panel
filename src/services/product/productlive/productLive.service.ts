import { productLiveDemoData } from "@/lib/constants/products/productliveDemoData";
import { IProductLiveQuery, IProductLiveResponse } from "@/types/product/productLive.types";


class ProductLiveServices {
  async list(query: IProductLiveQuery): Promise<IProductLiveResponse> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    let filtered = [...productLiveDemoData];

    if (query.stock !== "all") filtered = filtered.filter((p) => p.stockStatus === query.stock);
    if (query.live !== "all") filtered = filtered.filter((p) => p.liveStatus === query.live);
    if (query.type !== "all") filtered = filtered.filter((p) => p.type === query.type);

    if (query.search?.trim()) {
      const q = query.search.trim().toLowerCase();
      filtered = filtered.filter((p) => p.productId.toLowerCase().includes(q));
    }

    filtered.sort((a, b) => (query.sort === "high_to_low" ? b.totalSales - a.totalSales : a.totalSales - b.totalSales));

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

const productLiveServices = new ProductLiveServices();
export default productLiveServices;