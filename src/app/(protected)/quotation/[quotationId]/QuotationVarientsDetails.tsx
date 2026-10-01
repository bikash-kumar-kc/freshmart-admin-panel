import { IQuotationVariantDetail } from "@/types/quotation/quotationDetails.types";


export function QuotationVariantsDetail({
  variants,
  showCounter,
}: {
  variants: IQuotationVariantDetail[];
  showCounter: boolean;
}) {
  return (
    <div className="bg-statcard-background border border-statcard-border rounded-sm p-5">
      <h3 className="text-sm font-semibold text-app-foreground mb-4">Variants</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-app-border">
              <th className="text-left px-3 py-2 text-xs font-semibold text-statcard-label uppercase tracking-wide">
                Variant
              </th>
              <th className="text-right px-3 py-2 text-xs font-semibold text-statcard-label uppercase tracking-wide">
                Actual Price
              </th>
              <th className="text-right px-3 py-2 text-xs font-semibold text-statcard-label uppercase tracking-wide">
                Requested Price
              </th>
              {showCounter && (
                <th className="text-right px-3 py-2 text-xs font-semibold text-statcard-label uppercase tracking-wide">
                  Vendor Counter
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-app-border">
            {variants.map((variant) => (
              <tr key={variant.variantId}>
                <td className="px-3 py-3 text-table-cell-text font-medium">{variant.size}</td>
                <td className="px-3 py-3 text-right text-table-cell-text">Rs {variant.actualPrice}</td>
                <td className="px-3 py-3 text-right text-table-cell-text">Rs {variant.requestedPrice}</td>
                {showCounter && (
                  <td className="px-3 py-3 text-right font-medium text-brand-cta">
                    {variant.counterPrice !== null ? `Rs ${variant.counterPrice}` : "—"}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}