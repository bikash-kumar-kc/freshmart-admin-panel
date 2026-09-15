"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { VendorStatus } from "@/types/vendors/vendorList.types";
import { selectItemClass } from "@/components/dashboard/SalesOverviewChart";
import ReuseableSelect from "@/components/ReuseableSelect";
import SearchComponent from "@/components/SearchComponent";
import PageHeading from "@/components/PageHeading";

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

  function onBlurSearch() {
    if (!query) setSearchOpen(false);
  }

  return (
    <div className="space-y-4 mb-4">
      <PageHeading title="Vendors" message="Manage your vendors" />

      <div className="flex items-center gap-2 justify-between">
        
        <div className="flex md:hidden items-center flex-1">
          {searchOpen ? (
            <SearchComponent
              searchData={{
                placeholder: "Search by ID or farm name...",
                value: query,
                onChange: updateQuery,
                autofocus: true,
                onBlur: onBlurSearch,
                containerSytling: "flex md:hidden items-center flex-1",
                style:
                  "flex-1 border border-input-border rounded-sm px-3 py-2 text-sm bg-input-background text-input-text focus:border-input-border-focus outline-none",
              }}
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
        <SearchComponent
          searchData={{
            placeholder: "Search by ID or farm name...",
            value: query,
            onChange: updateQuery,
            autofocus: false,
          }}
        />

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
