import { IProductVariantDetail } from "@/types/product/productListing/productListingDetail.types";


const VISIBLE_VARIANTS = 2;
const ROW_HEIGHT_PX = 64; // approximate height of one variant row, used to cap the scroll area

export function ProductVariantsSection({
  variants,
  isInventory,
}: {
  variants: IProductVariantDetail[];
  isInventory: boolean;
}) {
  const needsScroll = variants.length > VISIBLE_VARIANTS;

  return (
    <div className="bg-statcard-background border border-statcard-border rounded-sm p-5">
      <h3 className="text-sm font-semibold text-app-foreground mb-4">Variants</h3>

      <div
        className={needsScroll ? "overflow-y-auto pr-1" : ""}
        style={needsScroll ? { maxHeight: `${ROW_HEIGHT_PX * VISIBLE_VARIANTS}px` } : undefined}
      >
        <div className="space-y-2">
          {variants.map((variant) => (
            <div
              key={variant.variantId}
              className="flex items-center justify-between gap-4 p-3 rounded-sm border border-app-border transition-all hover:bg-brand-primary hover:text-white hover:shadow-md group"
            >
              <div>
                <p className="text-sm font-medium text-app-foreground group-hover:text-white">
                  {variant.size}
                  {variant.measurementUnit}
                </p>
                <p className="text-xs text-statcard-label group-hover:text-white/80">
                  Qty: {variant.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-app-foreground group-hover:text-white">
                  Rs {variant.pricePerUnit}/unit
                </p>
                {isInventory && variant.sellingPrice !== null && (
                  <p className="text-xs text-statcard-label group-hover:text-white/80">
                    Sell: Rs {variant.sellingPrice}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}