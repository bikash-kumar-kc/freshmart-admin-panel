import { productListingDemoData } from "@/lib/constants/products/productListingDemoData";
import { IProductListingQuery, IProductListingResponse } from "@/types/product/productListing/productlisting.types";


class ProductListingServices {
  async list(query: IProductListingQuery): Promise<IProductListingResponse> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    let filtered = [...productListingDemoData];

    if (query.status !== "all") {
      filtered = filtered.filter((p) => p.status === query.status);
    }
    if (query.type !== "all") {
      filtered = filtered.filter((p) => p.type === query.type);
    }

    if (query.search?.trim()) {
      const q = query.search.trim().toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.productId.toLowerCase().includes(q) ||
          p.farmName.toLowerCase().includes(q) ||
          p.productName.toLowerCase().includes(q),
      );
    }

    filtered.sort((a, b) => {
      const diff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return query.sort === "new_to_old" ? -diff : diff;
    });

    if (query.search?.trim()) {
      return { data: filtered, total: filtered.length, page: 1, pageSize: filtered.length };
    }

    const start = (query.page - 1) * query.pageSize;
    const paginated = filtered.slice(start, start + query.pageSize);

    return { data: paginated, total: filtered.length, page: query.page, pageSize: query.pageSize };
  }
}

const productListingServices = new ProductListingServices();
export default productListingServices;