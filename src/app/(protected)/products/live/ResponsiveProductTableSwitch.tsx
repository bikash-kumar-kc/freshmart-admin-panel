// products/ResponsiveProductLiveTable.tsx
"use client";

import ProductLiveTable from "./ProductLiveTable";
import ProductLiveCard from "./ProductLiveCard";
import { IProductLiveRow } from "@/types/product/productLive.types";
import { useIsMobile } from "@/lib/hooks/useMobileHook";

interface ResponsiveProductLiveTableProps {
  data: IProductLiveRow[];
  isLoading: boolean;
  onToggleLive: (id: string, next: "live" | "draft") => void;
  onGenerateQuotation: (vendorId: string, id: string) => void;
  onNotifyVendor: (id: string) => void;
}

export default function ResponsiveProductLiveTable(
  props: ResponsiveProductLiveTableProps,
) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="space-y-3">
        {props.isLoading ? (
          <p className="text-sm text-app-muted-foreground text-center py-6">
            Loading...
          </p>
        ) : props.data.length === 0 ? (
          <p className="text-sm text-app-muted-foreground text-center py-6">
            No products found.
          </p>
        ) : (
          props.data.map((product) => (
            <ProductLiveCard
              key={product.productId}
              product={product}
              {...props}
            />
          ))
        )}
      </div>
    );
  }

  return <ProductLiveTable {...props} />;
}
