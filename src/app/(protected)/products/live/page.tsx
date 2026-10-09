// app/products/live/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import Pagination from "@/components/Pagination";
import { IProductLiveFilters } from "@/types/product/productLive.types";
import {
  productLiveKeys,
  useNotifyLiveVendorMutation,
  useProductLiveQuery,
  useUpdateProductLiveStatusMutation,
} from "@/lib/hooks/product/useProductLive";
import { ProductLiveHeader } from "./ProductLiveHeader";
import ResponsiveProductLiveTable from "./ResponsiveProductTableSwitch";
import { useDebouncedValue } from "@/lib/hooks/useDebounce";

export default function ProductLivePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 500);
  const [filters, setFilters] = useState<IProductLiveFilters>({
    stock: "all",
    live: "all",
    type: "all",
  });

  const updateStatus = useUpdateProductLiveStatusMutation();
  const notifyVendor = useNotifyLiveVendorMutation();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useProductLiveQuery({
    search,
    ...filters,
    page,
    pageSize,
  });

  function handleGenerateQuotation(vendorId: string, id: string) {
    router.push(
      `/quotation/createQuotation?vendorId=${vendorId}&productId=${id}`,
    );
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
        // onToggleLive={handleToggleLive}
        onToggleLive={(id, next) =>
          updateStatus.mutateAsync({ productId: id, status: next })
        }
        onGenerateQuotation={handleGenerateQuotation}
        // onNotifyVendor={handleNotifyVendor}
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
