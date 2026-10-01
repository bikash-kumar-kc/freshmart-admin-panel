// quotation/VariantMultiCombobox.tsx
"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/components/ui/command";
import { comboboxItemClass, comboboxTriggerClass } from "@/lib/constants/sharedComboStyle";
import { IProductVariantOption } from "@/types/quotation/createquotation.types";
import { appPrimaryColorOption } from "../../vendors/VendorPageHeader";


interface VariantMultiComboboxProps {
  variants: IProductVariantOption[];
  selectedIds: string[];
  onToggle: (variantId: string) => void;
  onSelectAll: () => void;
}

export function VariantMultiCombobox({ variants, selectedIds, onToggle, onSelectAll }: VariantMultiComboboxProps) {
  const [open, setOpen] = useState(false);
  const allSelected = variants.length > 0 && selectedIds.length === variants.length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className={comboboxTriggerClass}>
          <span className={selectedIds.length ? "text-input-text" : "text-input-placeholder"}>
            {selectedIds.length > 0 ? `${selectedIds.length} variant${selectedIds.length > 1 ? "s" : ""} selected` : "Select variants..."}
          </span>
          <ChevronsUpDown size={14} className="text-app-muted-foreground shrink-0" />
        </button>
      </PopoverTrigger>
      <PopoverContent className={`${appPrimaryColorOption} w-64 p-0`} align="start">
        <Command>
          <CommandInput placeholder="Search variant..." />
          <CommandList >
            <CommandEmpty>No variant found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                onSelect={onSelectAll}
                className={comboboxItemClass}
                data-selected={allSelected}
              >
                {allSelected && <Check size={14} className="absolute left-2 top-1/2 -translate-y-1/2" />}
                Select all
              </CommandItem>
            </CommandGroup>
            <CommandGroup>
              {variants.map((variant) => {
                const isSelected = selectedIds.includes(variant.variantId);
                return (
                  <CommandItem
                    key={variant.variantId}
                    value={variant.size}
                    data-selected={isSelected}
                    className={comboboxItemClass}
                    onSelect={() => onToggle(variant.variantId)}
                  >
                    {isSelected && <Check size={14} className="absolute left-2 top-1/2 -translate-y-1/2" />}
                    {variant.size} — Rs {variant.actualPrice}
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