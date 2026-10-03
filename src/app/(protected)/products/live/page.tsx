// app/products/live/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import Pagination from "@/components/Pagination";
import { IProductLiveFilters } from "@/types/product/productLive.types";
import {
  productLiveKeys,
  useProductLiveQuery,
} from "@/lib/hooks/product/useProductLive";
import { ProductLiveHeader } from "./ProductLiveHeader";
import ResponsiveProductLiveTable from "./ResponsiveProductTableSwitch";

export default function ProductLivePage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<IProductLiveFilters>({
    stock: "all",
    live: "all",
    type: "all",
    sort: "high_to_low",
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useProductLiveQuery({
    search,
    ...filters,
    page,
    pageSize,
  });
  const isSearching = search.trim().length > 0;

  function invalidate() {
    queryClient.invalidateQueries({ queryKey: productLiveKeys.all });
  }
  function handleToggleLive(id: string, next: "live" | "draft") {
    console.log("toggle live", id, next);
    invalidate();
  }
  function handleGenerateQuotation(vendorId:string,id: string) {
    router.push(`/quotation/createQuotation?vendorId=${vendorId}&productId=${id}`);
  }
  function handleNotifyVendor(id: string) {
    console.log("notify vendor", id);
    invalidate();
  }

  return (
    <div>
      <ProductLiveHeader
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

      <ResponsiveProductLiveTable
        data={data?.data ?? []}
        isLoading={isLoading}
        onToggleLive={handleToggleLive}
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
