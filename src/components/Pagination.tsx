"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "./components/hooks/use-mobile";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { selectItemClass } from "./dashboard/SalesOverviewChart";

const ROW_OPTIONS = [5, 10, 20, 100];

export const hoverBackgroundColor= 'hover:bg-[#262626] hover:text-app-foreground'

interface VendorPaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

function getPageNumbers(
  current: number,
  totalPages: number,
): (number | "ellipsis")[] {
  const pages: (number | "ellipsis")[] = [];
  const window = 1;

  for (let p = 1; p <= totalPages; p++) {
    if (
      p === 1 ||
      p === totalPages ||
      (p >= current - window && p <= current + window)
    ) {
      pages.push(p);
    } else if (pages[pages.length - 1] !== "ellipsis") {
      pages.push("ellipsis");
    }
  }
  return pages;
}

export default function VendorPagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: VendorPaginationProps) {
  const isMobile = useIsMobile();
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const pageButtonClass = (isActive: boolean) =>
    `w-8 h-8 flex items-center justify-center text-xs font-medium rounded-sm transition-colors ${
      isActive
        ? "border border-app-border  text-brand-primary"+`${hoverBackgroundColor} bg-[#262626]`
        : `${hoverBackgroundColor}`
    }`;

  return (
    <div className="flex items-center justify-between gap-3 mt-4 flex-wrap">
      {/* Left: rows per page */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-app-muted-foreground whitespace-nowrap">
          Rows per page
        </span>
        <Select
          value={String(pageSize)}
          onValueChange={(v) => onPageSizeChange(Number(v))}
        >
          <SelectTrigger className="w-16 h-8 text-xs border-app-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-app-background border-app-border text-app-foreground">
            {ROW_OPTIONS.map((opt) => (
              <SelectItem
                key={opt}
                value={String(opt)}
                className={selectItemClass}
              >
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Right: page controls */}
      {isMobile ? (
        <div className="flex items-center gap-3">
          <button
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="disabled:opacity-40 text-app-foreground hover:bg-menu-item-hover-bg rounded-sm p-1.5"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-xs text-app-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className="disabled:opacity-40 text-app-foreground hover:bg-menu-item-hover-bg rounded-sm p-1.5"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <button
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
 className={`${hoverBackgroundColor}disabled:opacity-40 text-xs font-medium px-2 py-1.5 rounded-sm text-app-foreground `}          >
            Prev
          </button>

          {getPageNumbers(page, totalPages).map((p, i) =>
            p === "ellipsis" ? (
              <span
                key={`ellipsis-${i}`}
                className="text-xs text-app-muted-foreground px-1"
              >
                ...
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={pageButtonClass(p === page)}
              >
                {p}
              </button>
            ),
          )}

          <button
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className={`${hoverBackgroundColor}disabled:opacity-40 text-xs font-medium px-2 py-1.5 rounded-sm text-app-foreground `}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
