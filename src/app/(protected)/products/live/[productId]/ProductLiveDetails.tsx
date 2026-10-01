// products/ProductLiveDetailHeader.tsx
import { IProductLiveDetail } from "@/types/product/productLiveDetails.types";
import Image from "next/image";
import { ProductOfferBadge } from "./ProductBadge";
import { liveStatusConfig } from "@/lib/constants/products/productliveStatusConfig";

export function ProductLiveDetailHeader({
  product,
}: {
  product: IProductLiveDetail;
}) {
  const live = liveStatusConfig[product.liveStatus];

  return (
    <div className="bg-statcard-background border border-statcard-border rounded-sm p-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-sm overflow-hidden bg-app-border relative shrink-0">
            <Image
              src={product.image}
              alt={product.productName}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-semibold text-app-foreground">
                {product.productName}
              </h2>
              <span
                className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${live.badgeClass}`}
              >
                {live.label}
              </span>
              <ProductOfferBadge offer={product.offer} />
            </div>
            <p className="text-xs text-app-muted-foreground capitalize mt-1">
              {product.type}
            </p>
          </div>
        </div>

        {product.offer.isActive ? (
          <button className="px-4 py-2 rounded-sm text-sm font-medium border border-app-border text-app-foreground hover:bg-app-background-hover transition-colors">
            Manage offer
          </button>
        ) : (
          <button className="px-4 py-2 rounded-sm text-sm font-medium bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors">
            Create offer
          </button>
        )}
      </div>
    </div>
  );
}
