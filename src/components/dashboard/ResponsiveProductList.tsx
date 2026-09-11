"use client";

import { ITopProduct } from "@/types/dashboard/topProduct.types";
import TopProductsCard from "./TopProductCard";
import TopProductsTable from "./TopProductTable";
import { useIsMobile } from "../components/hooks/use-mobile";

export default function ResponsiveProductList({
  data,
  isLoading,
}: {
  data: ITopProduct[];
  isLoading: boolean;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="space-y-3">
        {isLoading ? (
          <p className="text-sm text-app-muted-foreground text-center py-6">
            Loading...
          </p>
        ) : data.length === 0 ? (
          <p className="text-sm text-app-muted-foreground text-center py-6">
            No products found.
          </p>
        ) : (
          data.map((product) => (
            <TopProductsCard key={product.id} product={product} />
          ))
        )}
      </div>
    );
  }

  return <TopProductsTable data={data} isLoading={isLoading} />;
}
