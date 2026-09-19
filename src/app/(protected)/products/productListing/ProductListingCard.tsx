// products/ProductListingCard.tsx
"use client";

import { useRouter } from "next/navigation";
import { ListCard } from "@/components/ListCard";
import { IProductListingRow } from "@/types/product/productListing/productlisting.types";
import { productListingStatusConfig } from "@/lib/constants/products/productListingStatusConfig";
import { formatTimestamp } from "@/lib/utilis/timeFormatter";
import { getProductListingActions } from "./productListingAction";

function statusToVariant(status: IProductListingRow["status"]) {
  return status === "approved" ? ("approved" as const) : ("awaiting" as const);
}

interface ProductListingCardProps {
  product: IProductListingRow;
  onApprove: (id: string) => void;
  onGenerateQuotation: (id: string) => void;
  onNotifyVendor: (id: string) => void;
}

export default function ProductListingCard({
  product,
  onApprove,
  onGenerateQuotation,
  onNotifyVendor,
}: ProductListingCardProps) {
  const router = useRouter();

  return (
    <ListCard
      title={product.productName}
      status={{
        label: productListingStatusConfig[product.status].label,
        variant: statusToVariant(product.status),
      }}
      facts={[
        product.farmName,
        `Qty: ${product.quantity}`,
        `Rs ${product.unitPrice}/unit`,
        product.type,
      ]}
      meta={formatTimestamp(product.createdAt)}
      onClick={() =>
        router.push(`/products/productListing/${product.productId}`)
      }
      actions={getProductListingActions(product, {
        onApprove,
        onGenerateQuotation,
        onNotifyVendor,
      })}
    />
  );
}
