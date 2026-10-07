"use client";

import { useState } from "react";
import { VendorStatus } from "@/types/vendors/vendorList.types";
import {
  useApproveVendorMutation,
  useDeleteVendorMutation,
  useUnapproveVendorMutation,
  useVendorListQuery,
} from "@/lib/hooks/vendor/vendorList.queries";
import VendorPageHeader from "./VendorPageHeader";
import ResponsiveVendorList from "./VendorResponsiveList";

import Pagination from "@/components/Pagination";

export default function VendorsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<VendorStatus | "all">("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useVendorListQuery({
    search,
    status,
    page,
    pageSize,
  });

  const approveMutation = useApproveVendorMutation();
  const unapproveMutation = useUnapproveVendorMutation();
  const deleteMutation = useDeleteVendorMutation();

  const isSearching = search.trim().length > 0;
  const handleApprove = (id: string) => approveMutation.mutateAsync(id);
  const handleUnapprove = (id: string) => unapproveMutation.mutateAsync(id);
  const handleDelete = (id: string) => deleteMutation.mutateAsync(id);

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
