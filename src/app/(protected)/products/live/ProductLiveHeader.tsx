// products/ProductLiveHeader.tsx
"use client";

import { useState } from "react";
import PageHeading from "@/components/PageHeading";
import SearchComponent from "@/components/SearchComponent";
import { ProductLiveFilterSheet } from "./ProductLiveFilterSheet";
import { IProductLiveFilters } from "@/types/product/productLive.types";
// import { ProductLiveSortSelect } from "./ProductLiveSortSelect";


interface ProductLiveHeaderProps {
  onSearchChange: (value: string) => void;
  filters: IProductLiveFilters;
  onFiltersApply: (filters: IProductLiveFilters) => void;
}

export function ProductLiveHeader({ onSearchChange, filters, onFiltersApply }: ProductLiveHeaderProps) {
  const [query, setQuery] = useState("");

  return (
    <div className="space-y-4 mb-4">
      <PageHeading title="Live Products" message="Manage published and draft products" />

      <div className="flex items-center justify-between gap-3">
        <SearchComponent
          searchData={{
            placeholder: "Search by product ID...",
            value: query,
            onChange: (value) => {
              setQuery(value);
              onSearchChange(value);
            },
            autofocus: false,
          }}
        />

        <div className="flex items-center gap-2">
          {/* <ProductLiveSortSelect
            value={filters.sort}
            onChange={(sort) => onFiltersApply({ ...filters, sort })}
          /> */}
          <ProductLiveFilterSheet filters={filters} onApply={onFiltersApply} />
        </div>
      </div>
    </div>
  );
}