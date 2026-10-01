"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeading from "@/components/PageHeading";
import SearchComponent from "@/components/SearchComponent";
import {
  QuotationPrimaryBucket,
  QuotationSubStatus,
} from "@/types/quotation/quotation.types";
import ReuseableSelect from "@/components/ReuseableSelect";
import { appPrimaryColorOption } from "../vendors/VendorPageHeader";
import { subStatusOptionsByBucket } from "@/lib/constants/quotation/quotationStatus";
import { selectItemClass } from "@/components/dashboard/SalesOverviewChart";

interface QuotationListHeaderProps {
  bucket: QuotationPrimaryBucket;
  onBucketChange: (bucket: QuotationPrimaryBucket) => void;
  subStatus: QuotationSubStatus;
  onSubStatusChange: (status: QuotationSubStatus) => void;
  onSearchChange: (value: string) => void;
}

export function QuotationListHeader({
  bucket,
  onBucketChange,
  subStatus,
  onSubStatusChange,
  onSearchChange,
}: QuotationListHeaderProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  return (
    <div className="space-y-4 mb-4">
      <div className="flex items-center justify-between gap-3">
        <PageHeading
          title="Quotations"
          message="Manage inventory purchase negotiations with vendors"
        />
        <button
          onClick={() => router.push("/quotation/createQuotation")}
          className="px-4 py-2 rounded-sm text-sm font-medium bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors shrink-0"
        >
          Generate Quotation
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <SearchComponent
          searchData={{
            placeholder: "Search by quotation ID...",
            value: query,
            onChange: (value) => {
              setQuery(value);
              onSearchChange(value);
            },
            autofocus: false,
            containerSytling: "w-full md:block relative md:w-72",
          }}
        />

        <div className="flex items-center gap-2">
          <div className="flex border border-app-border rounded-sm overflow-hidden">
            <button
              onClick={() => onBucketChange("approved")}
              className={`px-3 py-2 text-xs font-medium transition-colors ${
                bucket === "approved"
                  ? "bg-brand-primary text-white"
                  : "text-app-foreground hover:bg-app-background-hover"
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => onBucketChange("unapproved")}
              className={`px-3 py-2 text-xs font-medium transition-colors ${
                bucket === "unapproved"
                  ? "bg-brand-primary text-white"
                  : "text-app-foreground hover:bg-app-background-hover"
              }`}
            >
              Unapproved
            </button>
          </div>

          <ReuseableSelect<QuotationSubStatus>
            data={{
              select: {
                value: subStatus,
                onSelectChange: onSubStatusChange,
                default: "all",
              },
              trigger: {
                style:
                  "w-36 shrink-0 border-app-border hover:text-app-foreground transition-colors",
                placeholder: "Status",
              },
              content: {
                style: appPrimaryColorOption,
                items: subStatusOptionsByBucket[bucket].map((opt) => ({
                  name: opt.label,
                  value: opt.value,
                  style: selectItemClass,
                })),
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
