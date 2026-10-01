// quotation/ProductMultiCombobox.tsx
"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/components/ui/command";
import { IApprovedProductOption } from "@/types/quotation/createquotation.types";
import {
  comboboxItemClass,
  comboboxTriggerClass,
} from "@/lib/constants/sharedComboStyle";
import { appPrimaryColorOption } from "../../vendors/VendorPageHeader";

interface ProductMultiComboboxProps {
  products: IApprovedProductOption[];
  selectedIds: string[];
  onToggle: (productListingId: string) => void;
  disabled: boolean;
}

export function ProductMultiCombobox({
  products,
  selectedIds,
  onToggle,
  disabled,
}: ProductMultiComboboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className={comboboxTriggerClass} disabled={disabled}>
          <span
            className={
              selectedIds.length ? "text-input-text" : "text-input-placeholder"
            }
          >
            {disabled
              ? "Select a vendor first"
              : selectedIds.length > 0
                ? `${selectedIds.length} product${selectedIds.length > 1 ? "s" : ""} selected`
                : "Select products..."}
          </span>
          <ChevronsUpDown
            size={14}
            className="text-app-muted-foreground shrink-0"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className={`${appPrimaryColorOption} w-72 p-0`}
        align="start"
      >
        <Command className={appPrimaryColorOption}>
          <CommandInput placeholder="Search product..." />
          <CommandList>
            <CommandEmpty>No product found.</CommandEmpty>
            <CommandGroup>
              {products.map((product) => {
                const isSelected = selectedIds.includes(
                  product.productListingId,
                );
                return (
                  <CommandItem
                    key={product.productListingId}
                    value={product.productName}
                    data-selected={isSelected}
                    className={comboboxItemClass}
                    onSelect={() => onToggle(product.productListingId)}
                  >
                    {isSelected && (
                      <Check
                        size={14}
                        className="absolute left-2 top-1/2 -translate-y-1/2"
                      />
                    )}
                    {product.productName}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
