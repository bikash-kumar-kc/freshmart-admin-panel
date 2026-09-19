// products/ProductDetailsSection.tsx
import { DetailSection } from "@/app/(protected)/vendors/[farmId]/DetailsSection";
import { IProductListingDetail } from "@/types/product/productListing/productListingDetail.types";
import { Tag, Package, Globe, FileText } from "lucide-react";

export function ProductDetailsSection({
  product,
}: {
  product: IProductListingDetail;
}) {
  return (
    <DetailSection
      title="Product Details"
      items={[
        { icon: Tag, label: "Category", value: product.category },
        {
          icon: Package,
          label: "Packaging Type",
          value: product.packagingType,
        },
        { icon: Globe, label: "Origin Country", value: product.originCountry },
        { icon: FileText, label: "Description", value: product.description },
      ]}
    />
  );
}
