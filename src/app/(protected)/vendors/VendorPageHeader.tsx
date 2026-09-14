// vendors/VendorPageHeader.tsx
"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { VendorStatus } from "@/types/vendors/vendorList.types";
import { selectItemClass } from "@/components/dashboard/SalesOverviewChart";
import ReuseableSelect from "@/components/ReuseableSelect";

export const appPrimaryColorOption =
  "bg-app-background text-app-foreground border-app-border";

interface VendorPageHeaderProps {
  onSearchChange: (value: string) => void;
  statusFilter: VendorStatus | "all";
  onStatusFilterChange: (value: VendorStatus | "all") => void;
}

export default function VendorPageHeader({
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: VendorPageHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  function updateQuery(value: string) {
    setQuery(value);
    onSearchChange(value);
  }

  return (
    <div className="space-y-4 mb-4">
      <div>
        <h1 className="text-xl font-semibold text-app-foreground">Vendors</h1>
        <p className="text-[10px]   font-semibold text-app-muted-foreground">
          Manages your vendors.
        </p>
      </div>

      <div className="flex items-center gap-2 justify-between">
        {/* Mobile search */}
        <div className="flex md:hidden items-center flex-1">
          {searchOpen ? (
            <input
              autoFocus
              value={query}
              onChange={(e) => updateQuery(e.target.value)}
              onBlur={() => {
                if (!query) setSearchOpen(false);
              }}
              placeholder="Search by ID or farm name..."
              className="flex-1 border border-input-border rounded-sm px-3 py-2 text-sm bg-input-background text-input-text focus:border-input-border-focus outline-none"
            />
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-sm hover:bg-menu-item-hover-bg"
            >
              <Search size={18} className="text-app-foreground" />
            </button>
          )}
        </div>

        
        <div className="hidden md:block relative w-72">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-app-muted-foreground"
          />
          <input
            value={query}
            onChange={(e) => updateQuery(e.target.value)}
            placeholder="Search by ID or farm name..."
            className="w-full pl-9 pr-3 py-2 border border-input-border rounded-sm text-sm bg-input-background text-input-text focus:border-input-border-focus outline-none"
          />
        </div>

        
        <ReuseableSelect<VendorStatus | "all">
          data={{
            select: {
              value: statusFilter,
              onSelectChange: onStatusFilterChange,
              default: "all",
            },
            trigger: {
              style:
                "w-36 shrink-0 border-app-border hover:text-app-foreground transition-colors",
              placeholder: "Status",
            },
            content: {
              style: appPrimaryColorOption,
              items: [
                {
                  name: "All statuses",
                  value: "all",
                  style: selectItemClass,
                },
                {
                  name: "Approved",
                  value: "approved",
                  style: selectItemClass,
                },
                {
                  name: "Unapproved",
                  value: "unapproved",
                  style: selectItemClass,
                },
                {
                  name: "Deleted",
                  value: "deleted",
                  style: selectItemClass,
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
}
