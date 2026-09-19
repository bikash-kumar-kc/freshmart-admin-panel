// products/ProductListingHeader.tsx
"use client";

import { useState } from "react";
import PageHeading from "@/components/PageHeading";
import SearchComponent from "@/components/SearchComponent";
import { IProductListingFilters } from "@/types/product/productListing/productlisting.types";
import { ProductFilterSheet } from "./ProductListingSheet";


interface ProductListingHeaderProps {
  onSearchChange: (value: string) => void;
  filters: IProductListingFilters;
  onFiltersApply: (filters: IProductListingFilters) => void;
}

export function ProductListingHeader({ onSearchChange, filters, onFiltersApply }: ProductListingHeaderProps) {
  const [query, setQuery] = useState("");

  return (
    <div className="space-y-4 mb-4">
      <PageHeading title="Product Listings" message="Review and manage vendor product submissions" />

      <div className="flex items-center justify-between gap-3">
        <SearchComponent
          searchData={{
            placeholder: "Search by ID, farm, or product name...",
            value: query,
            onChange: (value) => {
              setQuery(value);
              onSearchChange(value);
            },
            autofocus: false,
          }}
        />

        <ProductFilterSheet filters={filters} onApply={onFiltersApply} />
      </div>
    </div>
  );
}