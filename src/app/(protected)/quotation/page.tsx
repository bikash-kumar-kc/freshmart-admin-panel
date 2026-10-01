
"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Pagination from "@/components/Pagination";
import {
  QuotationPrimaryBucket,
  QuotationSubStatus,
} from "@/types/quotation/quotation.types";
import {
  quotationListKeys,
  useQuotationListQuery,
} from "@/lib/hooks/quotation/quotation.queries";
import { QuotationListHeader } from "./QuotationListHeader";
import ResponsiveQuotationListTable from "./ResponsiveQuotationTable";

export default function QuotationListPage() {
  const queryClient = useQueryClient();

  const [bucket, setBucket] = useState<QuotationPrimaryBucket>("approved"); // default screen = Approved
  const [subStatus, setSubStatus] = useState<QuotationSubStatus>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useQuotationListQuery({
    bucket,
    subStatus,
    search,
    page,
    pageSize,
  });
  const isSearching = search.trim().length > 0;

  function invalidate() {
    queryClient.invalidateQueries({ queryKey: quotationListKeys.all });
  }
  function handleCancel(id: string) {
    console.log("cancel quotation", id);
    invalidate();
  }
  function handleApprove(id: string) {
    console.log("approve quotation", id);
    invalidate();
  }

  return (
    <div>
      <QuotationListHeader
        bucket={bucket}
        onBucketChange={(b) => {
          setBucket(b);
          setSubStatus("all"); // reset sub-status since its options depend on the bucket
          setPage(1);
        }}
        subStatus={subStatus}
        onSubStatusChange={(s) => {
          setSubStatus(s);
          setPage(1);
        }}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      <ResponsiveQuotationListTable
        data={data?.data ?? []}
        isLoading={isLoading}
        onCancel={handleCancel}
        onApprove={handleApprove}
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
