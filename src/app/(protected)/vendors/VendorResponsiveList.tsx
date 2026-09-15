
"use client";

import { useIsMobile } from "@/lib/hooks/useMobileHook";
import { IVendorListItem } from "@/types/vendors/vendorList.types";
import VendorsTable from "./VendorTable";
import VendorCard from "./vendorCard";


interface ResponsiveVendorListProps {
  data: IVendorListItem[];
  isLoading: boolean;
  onApprove: (id: string) => void;
  onUnapprove: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ResponsiveVendorList(props: ResponsiveVendorListProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="space-y-3">
        {props.isLoading ? (
          <p className="text-sm text-app-muted-foreground text-center py-6">Loading...</p>
        ) : props.data.length === 0 ? (
          <p className="text-sm text-app-muted-foreground text-center py-6">No vendors found.</p>
        ) : (
          props.data.map((vendor) => (
            <VendorCard
              key={vendor.farmId}
              vendor={vendor}
              onApprove={props.onApprove}
              onUnapprove={props.onUnapprove}
              onDelete={props.onDelete}
            />
          ))
        )}
      </div>
    );
  }

  return <VendorsTable {...props} />;
}