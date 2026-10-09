// products/ProductLiveFilterSheet.tsx
"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/components/ui/button";
import { ProductStockStatus } from "@/types/dashboard/topProduct.types";
import {
  IProductLiveFilters,
  ProductLiveStatus,
  ProductLiveType,
} from "@/types/product/productLive.types";
import { appPrimaryColorOption } from "../../vendors/VendorPageHeader";

const styles = {
  filterGroupButton:
    "px-3 py-1.5 rounded-sm text-xs font-medium border transition-colors",
  filterGroupButtonActive: "bg-brand-primary text-white border-brand-primary",
  filterGroupButtonInactive:
    "border-app-border text-app-foreground hover:bg-app-background-hover",
  sheetTriggerButton:
    "flex items-center gap-1.5 px-3 py-2 rounded-sm text-sm font-medium border border-app-border hover:bg-app-background-hover transition-colors",
  sheetContent:
    "left-1/2! right-auto! w-175! max-w-[calc(100%-2rem)]! -translate-x-1/2 rounded-t-xl px-3",
  sheetDescription:
    "text-app-muted-foreground hover:text-app-foreground transition-colors text-[12px]",
  sheetCancelButton:
    "flex-1 hover:bg-app-background-hover hover:text-app-foreground transition-colors border-app-border",
};

interface FilterGroupProps<T extends string> {
  options: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
}

function FilterGroup<T extends string>({
  options,
  value,
  onChange,
  disabled,
}: FilterGroupProps<T> & { disabled?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`${styles.filterGroupButton} ${
            value === opt.value
              ? styles.filterGroupButtonActive
              : styles.filterGroupButtonInactive
          } disabled:opacity-40 disabled:cursor-not-allowed`}
          disabled={disabled}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

interface ProductLiveFilterSheetProps {
  filters: IProductLiveFilters;
  onApply: (filters: IProductLiveFilters) => void;
}

export function ProductLiveFilterSheet({
  filters,
  onApply,
}: ProductLiveFilterSheetProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<IProductLiveFilters>(filters);

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
        className={styles.sheetTriggerButton}
      >
        <SlidersHorizontal size={15} />
        Filters
      </button>

      <SheetContent
        side="bottom"
        className={`${styles.sheetContent} ${appPrimaryColorOption} `}
      >
        <SheetHeader>
          <SheetTitle className="text-app-foreground">Filters</SheetTitle>
          <SheetDescription className={styles.sheetDescription}>
            Narrow down products by stock, live status, and type.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-4 overflow-y-auto max-h-[60vh]">
          <div>
            <p className="text-xs font-medium text-app-muted-foreground mb-2">
              Stock
            </p>
            <FilterGroup<ProductStockStatus | "all">
              options={[
                { label: "All", value: "all" },
                { label: "In Stock", value: "in_stock" },
                { label: "Low Stock", value: "low_stock" },
                { label: "Out of Stock", value: "out_of_stock" },
              ]}
              value={draft.stock}
              onChange={(stock) => setDraft((prev) => ({ ...prev, stock }))}
              disabled={draft.live === "draft"}
            />
          </div>

          <div>
            <p className="text-xs font-medium text-app-muted-foreground mb-2">
              Live status
            </p>
            <FilterGroup<ProductLiveStatus | "all">
              options={[
                { label: "All", value: "all" },
                { label: "Draft", value: "draft" },
                { label: "Live", value: "live" },
              ]}
              value={draft.live}
              onChange={(live) =>
                setDraft((prev) => ({
                  ...prev,
                  live,
                  stock: live === "draft" ? "all" : prev.stock,
                }))
              }
            />
          </div>

          <div>
            <p className="text-xs font-medium text-app-muted-foreground mb-2">
              Type
            </p>
            <FilterGroup<ProductLiveType | "all">
              options={[
                { label: "All", value: "all" },
                { label: "Inventory", value: "inventory" },
                { label: "Display", value: "display" },
              ]}
              value={draft.type}
              onChange={(type) => setDraft((prev) => ({ ...prev, type }))}
            />
          </div>
        </div>

        <SheetFooter className={`flex-row gap-2 ${appPrimaryColorOption}`}>
          <Button
            variant="ghost"
            className={styles.sheetCancelButton}
            onClick={() =>
              setDraft({
                stock: "all",
                live: "all",
                type: "all"
              })
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
