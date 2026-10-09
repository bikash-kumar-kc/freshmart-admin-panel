// app/products/productListing/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IProductListingFilters } from "@/types/product/productListing/productlisting.types";
import {
  useApproveProductListingMutation,
  useNotifyListingVendorMutation,
  useProductListingQuery,
} from "@/lib/hooks/product/useProductListing";
import { ProductListingHeader } from "./ProductListingHeader";
import ResponsiveProductListingTable from "./ProductListingSwitcher";
import Pagination from "@/components/Pagination";
import { useDebouncedValue } from "@/lib/hooks/useDebounce";

export default function ProductListingPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<IProductListingFilters>({
    status: "all",
    type: "all",
    sort: "new_to_old",
  });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const debouncedSearch = useDebouncedValue(search, 500);
  const { data, isLoading } = useProductListingQuery({
    ...filters,
    search: debouncedSearch,
    page,
    pageSize,
  });
  const approve = useApproveProductListingMutation();
  const notifyVendor = useNotifyListingVendorMutation();

  function handleGenerateQuotation(vendorId: string, id: string) {
    router.push(
      `/quotation/createQuotation?vendorId=${vendorId}&productId=${id}`,
    );
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
        onGenerateQuotation={handleGenerateQuotation}
        onApprove={(id) => approve.mutateAsync(id)}
        onNotifyVendor={(id) => notifyVendor.mutateAsync(id)}
      />

      {data && (
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
