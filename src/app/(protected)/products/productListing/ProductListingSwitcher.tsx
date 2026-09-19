// products/ResponsiveProductListingTable.tsx
"use client";

import { useIsMobile } from "@/lib/hooks/useMobileHook";
import { IProductListingRow } from "@/types/product/productListing/productlisting.types";
import ProductListingCard from "./ProductListingCard";
import ProductListingTable from "./ProductLisitingTable";

interface ResponsiveProductListingTableProps {
  data: IProductListingRow[];
  isLoading: boolean;
  onApprove: (id: string) => void;
  onGenerateQuotation: (id: string) => void;
  onNotifyVendor: (id: string) => void;
}

export default function ResponsiveProductListingTable(
  props: ResponsiveProductListingTableProps,
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
            <ProductListingCard
              key={product.productId}
              product={product}
              onApprove={props.onApprove}
              onGenerateQuotation={props.onGenerateQuotation}
              onNotifyVendor={props.onNotifyVendor}
            />
          ))
        )}
      </div>
    );
  }

  return <ProductListingTable {...props} />;
}
