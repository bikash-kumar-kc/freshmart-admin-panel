// products/ProductProfileSection.tsx
import { productListingStatusConfig } from "@/lib/constants/products/productListingStatusConfig";
import { IProductListingDetail } from "@/types/product/productListing/productListingDetail.types";
import Image from "next/image";

export function ProductProfileSection({
  product,
}: {
  product: IProductListingDetail;
}) {
  const status = productListingStatusConfig[product.status];
  const type = product.type;

  return (
    <div className="bg-statcard-background border border-statcard-border rounded-sm overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-brand-primary-soft to-brand-cta-soft" />

      <div className="px-5 pb-5">
        <div className="-mt-10 w-20 h-20 rounded-sm border-4 border-statcard-background overflow-hidden bg-app-border relative shrink-0">
          <Image
            src={product.images[0]}
            alt={product.localName}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex items-center gap-2 mt-3">
          <h2 className="text-lg font-semibold text-app-foreground">
            {product.localName}
          </h2>
          <span
            className={`text-[12px] font-medium px-2 py-0.5 rounded-full ${status.badgeClass}`}
          >
            {status.label}
          </span>
          <span
            className={`text-[12px] font-medium px-2 py-0.5 rounded-full bg-status-neutral-bg text-status-neutral-text`}
          >
            {type}
          </span>
        </div>
      </div>
    </div>
  );
}
