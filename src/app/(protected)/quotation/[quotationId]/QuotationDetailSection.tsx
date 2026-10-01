// quotation/QuotationDetailsSection.tsx
import { Hash, User, Warehouse, Package, Tag } from "lucide-react";
import { DetailSection } from "../../vendors/[farmId]/DetailsSection";
import type { IQuotationDetail } from "@/types/quotation/quotationDetails.types";
import { quotationStatusConfig } from "@/lib/constants/quotation/quotationStatus";

export function QuotationDetailsSection({
  quotation,
}: {
  quotation: IQuotationDetail;
}) {
  return (
    <DetailSection
      title="Quotation Details"
      items={[
        { icon: Hash, label: "Quotation ID", value: quotation.quotationId },
        { icon: User, label: "Vendor ID", value: quotation.vendorId },
        { icon: Warehouse, label: "Farm Name", value: quotation.farmName },
        {
          icon: Package,
          label: "Product ID",
          value: quotation.productListingId,
        },
        { icon: Tag, label: "Product Name", value: quotation.productName },
      ]}
    />
  );
}
