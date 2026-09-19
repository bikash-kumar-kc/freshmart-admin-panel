// app/products/productListing/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { IProductListingFilters } from "@/types/product/productListing/productlisting.types";
import {
  productListingKeys,
  useProductListingQuery,
} from "@/lib/hooks/product/useProductListing";
import { ProductListingHeader } from "./ProductListingHeader";
import ResponsiveProductListingTable from "./ProductListingSwitcher";
import Pagination from "@/components/Pagination";

export default function ProductListingPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<IProductListingFilters>({
    status: "all",
    type: "all",
    sort: "new_to_old",
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useProductListingQuery({
    search,
    ...filters,
    page,
    pageSize,
  });
  const isSearching = search.trim().length > 0;

  function invalidate() {
    queryClient.invalidateQueries({ queryKey: productListingKeys.all });
  }
  function handleApprove(id: string) {
    console.log("approve product", id);
    invalidate();
  }
  function handleGenerateQuotation(id: string) {
    router.push(`/quotation/create?productId=${id}`);
  }
  function handleNotifyVendor(id: string) {
    console.log("notify vendor for product", id);
    invalidate();
  }

  return (
    <div>
      <ProductListingHeader
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        filters={filters}
        onFiltersApply={(next) => {
          setFilters(next);
          setPage(1);
        }}
      />

      <ResponsiveProductListingTable
        data={data?.data ?? []}
        isLoading={isLoading}
        onApprove={handleApprove}
        onGenerateQuotation={handleGenerateQuotation}
        onNotifyVendor={handleNotifyVendor}
      />

      {!isSearching && data && (
        <Pagination
          page={page}
          pageSize={pageSize}
          total={data.total}
          onPageChange={setPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
        />
      )}
    </div>
  );
}
