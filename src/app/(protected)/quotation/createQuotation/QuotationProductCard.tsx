// quotation/QuotationProductCard.tsx
"use client";

import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/components/ui/tooltip";
import { IApprovedProductOption } from "@/types/quotation/createquotation.types";
import type { CreateQuotationFormValues } from "@/lib/validation/quotation/createQuotation";
import { VariantMultiCombobox } from "./VarientMultiCombo";
import { removeIncrementDecrement } from "@/lib/constants/removeInputIncrementDecrement";

interface QuotationProductCardProps {
  productIndex: number;
  productOption: IApprovedProductOption;
  onRemoveProduct: () => void;
}

export function QuotationProductCard({
  productIndex,
  productOption,
  onRemoveProduct,
}: QuotationProductCardProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateQuotationFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `products.${productIndex}.variants`,
  });

  const selectedVariantIds = fields.map((f) => f.variantId);

  function toggleVariant(variantId: string) {
    const existingIdx = fields.findIndex((f) => f.variantId === variantId);
    if (existingIdx >= 0) {
      remove(existingIdx);
    } else {
      const variant = productOption.variants.find(
        (v) => v.variantId === variantId,
      )!;
      append({
        variantId: variant.variantId,
        size: variant.size,
        actualPrice: variant.actualPrice,
        requestedPrice: variant.actualPrice,
        quantity: 1,
      });
    }
  }

  function selectAllVariants() {
    const allSelected = fields.length === productOption.variants.length;
    if (allSelected) {
      // clear all
      for (let i = fields.length - 1; i >= 0; i--) remove(i);
    } else {
      productOption.variants.forEach((variant) => {
        if (!selectedVariantIds.includes(variant.variantId)) {
          append({
            variantId: variant.variantId,
            size: variant.size,
            actualPrice: variant.actualPrice,
            requestedPrice: variant.actualPrice,
            quantity: 1,
          });
        }
      });
    }
  }

  const productErrors = errors.products?.[productIndex];

  return (
    <div className="bg-statcard-background border border-statcard-border rounded-sm p-5">
      <div className="flex items-center justify-between gap-3 mb-4">
        <p className="text-sm font-semibold text-app-foreground">
          {productOption.productName}
        </p>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onRemoveProduct}
              className="p-1.5 rounded-sm text-status-rejected-text hover:bg-status-rejected-bg transition-colors"
            >
              <X size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent>Remove product</TooltipContent>
        </Tooltip>
      </div>

      <VariantMultiCombobox
        variants={productOption.variants}
        selectedIds={selectedVariantIds}
        onToggle={toggleVariant}
        onSelectAll={selectAllVariants}
      />
      {productErrors?.variants?.root?.message && (
        <p className="text-xs text-input-text-error mt-1">
          {productErrors.variants.root.message}
        </p>
      )}

      {fields.length > 0 && (
        <div className="space-y-3 mt-4">
          {fields.map((field, variantIndex) => {
            const variantError = productErrors?.variants?.[variantIndex];
            return (
              <div
                key={field.id}
                className="grid grid-cols-2 sm:grid-cols-5 gap-3 items-start p-3 rounded-sm border border-app-border hover:border-input-border-focus"
              >
                <div>
                  <p className="text-[11px] text-app-muted-foreground">
                    Variant
                  </p>
                  <p className="text-sm font-medium text-app-foreground">
                    {field.size}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-app-muted-foreground">
                    Actual Price
                  </p>
                  <p className="text-sm font-medium text-app-foreground">
                    Rs {field.actualPrice}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-app-muted-foreground mb-1">
                    Requested Price
                  </p>
                  <Controller
                    control={control}
                    name={`products.${productIndex}.variants.${variantIndex}.requestedPrice`}
                    render={({ field: f }) => (
                      <input
                        type="number"
                        {...f}
                        min={1}
                        max={field.actualPrice}
                        className={`w-full px-2 py-1.5 text-sm rounded-sm border border-input-border bg-input-background text-input-text focus:border-input-border-focus outline-none ${removeIncrementDecrement}`}
                      />
                    )}
                  />
                  {variantError?.requestedPrice && (
                    <p className="text-[11px] text-input-text-error mt-0.5">
                      {variantError.requestedPrice.message}
                    </p>
                  )}
                </div>

                <div>
                  <p className="text-[11px] text-app-muted-foreground mb-1">
                    Quantity
                  </p>
                  <Controller
                    control={control}
                    name={`products.${productIndex}.variants.${variantIndex}.quantity`}
                    render={({ field: f }) => (
                      <input
                        type="number"
                        {...f}
                        min={1}
                        className={`w-full px-2 py-1.5 text-sm rounded-sm border border-input-border bg-input-background text-input-text focus:border-input-border-focus outline-none ${removeIncrementDecrement}`}
                      />
                    )}
                  />
                  {variantError?.quantity && (
                    <p className="text-[11px] text-input-text-error mt-0.5">
                      {variantError.quantity.message}
                    </p>
                  )}
                </div>

                <div className="flex items-start justify-end">
                  <button
                    onClick={() => remove(variantIndex)}
                    className="p-1.5 rounded-sm text-status-rejected-text hover:bg-status-rejected-bg transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
