// products/ProductFilterSheet.tsx
"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "@/components/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/components/ui/button";
import {
  CreatedAtSort,
  IProductListingFilters,
  ProductListingStatus,
  ProductListingType,
} from "@/types/product/productListing/productlisting.types";
import { appPrimaryColorOption } from "../../vendors/VendorPageHeader";

interface FilterButtonGroupProps<T extends string> {
  options: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
}

function FilterButtonGroup<T extends string>({
  options,
  value,
  onChange,
}: FilterButtonGroupProps<T>) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 rounded-sm text-xs font-medium border transition-colors ${
            value === opt.value
              ? "bg-brand-primary text-white border-brand-primary"
              : "border-app-border text-app-foreground hover:bg-[#262626]"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

interface ProductFilterSheetProps {
  filters: IProductListingFilters;
  onApply: (filters: IProductListingFilters) => void;
}

export function ProductFilterSheet({
  filters,
  onApply,
}: ProductFilterSheetProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<IProductListingFilters>(filters);

  function handleOpenChange(next: boolean) {
    if (next) setDraft(filters); 
    setOpen(next);
  }

  function handleApply() {
    onApply(draft);
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-sm text-sm font-medium border border-app-border hover:bg-[#262626] transition-colors"
      >
        <SlidersHorizontal size={15} />
        Filters
      </button>

      <SheetContent
        side="bottom"
        className={`${appPrimaryColorOption}  left-1/2!
      right-auto!
      w-175!
      max-w-[calc(100%-2rem)]!
      -translate-x-1/2
      rounded-t-xl px-3 `}
      >
        <SheetHeader>
          <SheetTitle className="text-app-foreground">Filters</SheetTitle>
          <SheetDescription className="text-app-muted-foreground hover:text-app-foreground transition-colors text-[12px]">
            Apply multiple filters.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-4 overflow-y-auto">
          <div>
            <p className="text-sm font-medium text-app-muted-foreground mb-2">
              Product Status
            </p>
            <FilterButtonGroup<ProductListingStatus | "all">
              options={[
                { label: "All statuses", value: "all" },
                { label: "Approved", value: "approved" },
                { label: "Unapproved", value: "unapproved" },
              ]}
              value={draft.status}
              onChange={(status) => setDraft((prev) => ({ ...prev, status }))}
            />
          </div>

          <div>
            <p className="text-sm font-medium text-app-muted-foreground mb-2">
              Product Type
            </p>
            <FilterButtonGroup<ProductListingType | "all">
              options={[
                { label: "All types", value: "all" },
                { label: "Inventory", value: "inventory" },
                { label: "Display", value: "display" },
              ]}
              value={draft.type}
              onChange={(type) => setDraft((prev) => ({ ...prev, type }))}
            />
          </div>

          <div>
            <p className="text-sm font-medium text-app-muted-foreground mb-2">
              Product Created
            </p>
            <FilterButtonGroup<CreatedAtSort>
              options={[
                { label: "New to old", value: "new_to_old" },
                { label: "Old to new", value: "old_to_new" },
              ]}
              value={draft.sort}
              onChange={(sort) => setDraft((prev) => ({ ...prev, sort }))}
            />
          </div>
        </div>

        <SheetFooter className="flex-row gap-2">
          <Button
            variant="ghost"
            className="flex-1 hover:bg-[#262626] hover:text-app-foreground transition-colors border-app-border "
            onClick={() =>
              setDraft({ status: "all", type: "all", sort: "new_to_old" })
            }
          >
            Clear
          </Button>
          <Button
            className="flex-1 bg-brand-primary hover:bg-brand-primary/90 text-white"
            onClick={handleApply}
          >
            Apply
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
