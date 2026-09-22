// products/ProductLiveCard.tsx
"use client";

import { useRouter } from "next/navigation";
import { ListCard } from "@/components/ListCard";
import { IProductLiveRow } from "@/types/product/productLive.types";
import { formatOfferRemaining } from "@/lib/utilis/offerFormat";
import { liveStatusConfig } from "@/lib/constants/products/productliveStatusConfig";
import { getProductLiveActions } from "./productLiveAction";


export default function ProductLiveCard({
  product,
  onToggleLive,
  onGenerateQuotation,
  onNotifyVendor,
}: {
  product: IProductLiveRow;
  onToggleLive: (id: string, next: "live" | "draft") => void;
  onGenerateQuotation: (id: string) => void;
  onNotifyVendor: (id: string) => void;
}) {
  const router = useRouter();
  const offerText = formatOfferRemaining(product.offerEndDate);

  const facts = [
    `Stock: ${product.totalStock}`,
    `Sales: ${product.totalSales}`,
    `Orders: ${product.totalOrders}`,
  ];
  if (offerText) facts.push(offerText);

  return (
    <ListCard
      title={product.productName}
      status={{
        label: liveStatusConfig[product.liveStatus].label,
        variant: product.liveStatus === "live" ? "approved" : "neutral",
      }}
      facts={facts}
      meta={product.productId}
      onClick={() => router.push(`/products/live/${product.productId}`)}
      actions={getProductLiveActions(product, { onToggleLive, onGenerateQuotation, onNotifyVendor })}
    />
  );
}