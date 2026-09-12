// vendors/VendorCard.tsx
"use client";

import { formatTimestamp } from "@/lib/utilis/timeFormatter";
import { IVendorListItem } from "@/types/vendors/vendorList.types";
import { useRouter } from "next/navigation";
import { getVendorActions } from "./vendorAction";
import { ListCard } from "@/components/ListCard";
import { vendorStatusConfig } from "@/lib/constants/vendors/vendorStatusConfig";


function statusToVariant(status: IVendorListItem["status"]) {
  if (status === "approved") return "approved" as const;
  if (status === "unapproved") return "awaiting" as const;
  return "rejected" as const;
}

interface VendorCardProps {
  vendor: IVendorListItem;
  onApprove: (id: string) => void;
  onUnapprove: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function VendorCard({ vendor, onApprove, onUnapprove, onDelete }: VendorCardProps) {
  const router = useRouter();

  return (
    <ListCard
      title={vendor.farmName}
      status={{ label: vendorStatusConfig[vendor.status].label, variant: statusToVariant(vendor.status) }}
      facts={[vendor.email, `${vendor.location.ward}, ${vendor.location.district}`, vendor.phone]}
      meta={formatTimestamp(vendor.createdAt)}
      onClick={() => router.push(`/vendors/${vendor.farmId}`)}
      actions={getVendorActions(vendor, { onApprove, onUnapprove, onDelete })}
    />
  );
}