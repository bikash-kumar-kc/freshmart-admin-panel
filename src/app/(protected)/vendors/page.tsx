"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { VendorStatus } from "@/types/vendors/vendorList.types";
import {
  useVendorListQuery,
  vendorKeys,
} from "@/lib/hooks/vendor/vendorList.queries";
import VendorPageHeader from "./VendorPageHeader";
import ResponsiveVendorList from "./VendorResponsiveList";

import Pagination from "@/components/Pagination";

export default function VendorsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<VendorStatus | "all">("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const queryClient = useQueryClient();

  const { data, isLoading } = useVendorListQuery({
    search,
    status,
    page,
    pageSize,
  });

  const isSearching = search.trim().length > 0;

  // Demo-data mutations — replace method bodies with real mutations once the endpoint exists
  function invalidate() {
    queryClient.invalidateQueries({ queryKey: vendorKeys.all });
  }
  function handleApprove(id: string) {
    console.log("approve", id);
    invalidate();
  }
  function handleUnapprove(id: string) {
    console.log("unapprove", id);
    invalidate();
  }
  function handleDelete(id: string) {
    console.log("delete", id);
    invalidate();
  }

  return (
    <div className="bg-statcard-background border border-statcard-border rounded-md p-3 shadow-lg min-w-45">
      <VendorPageHeader
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        statusFilter={status}
        onStatusFilterChange={(value) => {
          setStatus(value);
          setPage(1);
        }}
      />

      <ResponsiveVendorList
        data={data?.data ?? []}
        isLoading={isLoading}
        onApprove={handleApprove}
        onUnapprove={handleUnapprove}
        onDelete={handleDelete}
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
