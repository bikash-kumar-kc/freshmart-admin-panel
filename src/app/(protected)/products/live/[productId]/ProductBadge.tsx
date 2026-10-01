// products/ProductOfferBadge.tsx
import { IProductOffer } from "@/types/product/productLiveDetails.types";
import { differenceInDays } from "date-fns";
import { Tag } from "lucide-react";

export function ProductOfferBadge({ offer }: { offer: IProductOffer }) {
  if (!offer.isActive || !offer.validUntil) return null;

  const daysLeft = differenceInDays(new Date(offer.validUntil), new Date());

  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full bg-brand-cta-soft text-brand-cta">
      <Tag size={12} />
      Offer active ·{" "}
      {daysLeft > 0
        ? `${daysLeft} day${daysLeft > 1 ? "s" : ""} left`
        : "Ends today"}
    </span>
  );
}
