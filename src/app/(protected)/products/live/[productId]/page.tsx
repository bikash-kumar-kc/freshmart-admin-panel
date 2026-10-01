// app/products/live/[productId]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { ProductLiveDetailHeader } from "./ProductLiveDetails";
import { ProductStatCards } from "./ProductKpiCard";
import { ProductSalesTrendChart } from "./ProductSalesTrend";
import { ProductRecentOrders } from "./ProductRecentOrder";
import { useProductLiveDetailQuery } from "@/lib/hooks/product/useProductLive";

export default function ProductLiveDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const { data: product, isLoading } = useProductLiveDetailQuery(productId);

  if (isLoading || !product) {
    return <p className="text-sm text-app-muted-foreground">Loading...</p>;
  }

  return (
    <div className="space-y-5">
      <ProductLiveDetailHeader product={product} />
      <ProductStatCards product={product} />
      <ProductSalesTrendChart data={product.salesTrend} />
      <ProductRecentOrders
        orders={product.recentOrders}
        productType={product.type}
      />
    </div>
  );
}
