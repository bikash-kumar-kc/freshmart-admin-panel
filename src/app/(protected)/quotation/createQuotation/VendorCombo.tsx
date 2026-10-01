// quotation/VendorCombobox.tsx
"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
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
import {
  comboboxItemClass,
  comboboxTriggerClass,
} from "@/lib/constants/sharedComboStyle";
import { IApprovedVendorOption } from "@/types/quotation/createquotation.types";
import { appPrimaryColorOption } from "../../vendors/VendorPageHeader";

interface VendorComboboxProps {
  vendors: IApprovedVendorOption[];
  value: string;
  onChange: (vendorId: string) => void;
}

export function VendorCombobox({
  vendors,
  value,
  onChange,
}: VendorComboboxProps) {
  const [open, setOpen] = useState(false);
  const selected = vendors.find((v) => v.vendorId === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className={comboboxTriggerClass}>
          <span
            className={selected ? "text-input-text" : "text-input-placeholder"}
          >
            {selected ? selected.farmName : "Select vendor..."}
          </span>
          <ChevronsUpDown
            size={14}
            className="text-app-muted-foreground shrink-0"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent  className={`${appPrimaryColorOption} w-72 p-0`} align="start">
        <Command>
          <CommandInput placeholder="Search vendor..." className={appPrimaryColorOption}/>
          <CommandList>
            <CommandEmpty>No vendor found.</CommandEmpty>
            <CommandGroup>
              {vendors.map((vendor) => (
                <CommandItem
                  key={vendor.vendorId}
                  value={vendor.farmName}
                  data-selected={vendor.vendorId === value}
                  className={comboboxItemClass}
                  onSelect={() => {
                    onChange(vendor.vendorId);
                    setOpen(false);
                  }}
                >
                  {vendor.vendorId === value && (
                    <Check
                      size={14}
                      className="absolute left-2 top-1/2 -translate-y-1/2"
                    />
                  )}
                  {vendor.farmName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
