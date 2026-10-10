"use client";

import { useState } from "react";

import Pagination from "@/components/Pagination";
import {
  QuotationPrimaryBucket,
  QuotationSubStatus,
} from "@/types/quotation/quotation.types";
import {
  useApproveQuotationMutation,
  useCancelQuotationMutation,
  useQuotationListQuery,
} from "@/lib/hooks/quotation/quotation.queries";
import { QuotationListHeader } from "./QuotationListHeader";
import ResponsiveQuotationListTable from "./ResponsiveQuotationTable";
import { useDebouncedValue } from "@/lib/hooks/useDebounce";

export default function QuotationListPage() {
  const [bucket, setBucket] = useState<QuotationPrimaryBucket>("approved");
  const [subStatus, setSubStatus] = useState<QuotationSubStatus>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const debouncedSearch = useDebouncedValue(search, 500);
  const { data, isLoading } = useQuotationListQuery({
    bucket,
    subStatus,
    search: debouncedSearch,
    page,
    pageSize,
  });

  console.log(data);

  const cancelQuotation = useCancelQuotationMutation();
  const approveQuotation = useApproveQuotationMutation();

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
        onCancel={(id) => cancelQuotation.mutateAsync(id).catch(() => {})}
        onApprove={(id) => approveQuotation.mutateAsync(id).catch(() => {})}
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
