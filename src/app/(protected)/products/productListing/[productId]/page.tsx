// app/products/productListing/[productId]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  productListingKeys,
  useProductListingDetailQuery,
} from "@/lib/hooks/product/useProductListing";
import { ProductListingPageHeading } from "./Heading";
import { ProductProfileSection } from "./ProfileSection";
import { ProductDetailsSection } from "./ProductDetailsSection";
import { ProductVariantsSection } from "./VariantsSection";
import { CertificateGallery } from "@/app/(protected)/vendors/[farmId]/CertificateGallary";
import { ProductBottomActionBar } from "./Action";

export default function ProductListingDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const queryClient = useQueryClient();
  const { data: product, isLoading } = useProductListingDetailQuery(productId);

  function invalidate() {
    queryClient.invalidateQueries({ queryKey: productListingKeys.all });
  }
  function handleApprove() {
    console.log("approve product", productId);
    invalidate();
  }
  function handleNotifyVendor() {
    console.log("notify vendor for product", productId);
    invalidate();
  }

  if (isLoading || !product) {
    return <p className="text-sm text-app-muted-foreground">Loading...</p>;
  }

  return (
    <div className="space-y-5">
      <ProductListingPageHeading
        farmName={product.farmName}
        vendorId={product.vendorId}
      />

      <ProductProfileSection product={product} />
      <ProductDetailsSection product={product} />
      <ProductVariantsSection
        variants={product.variants}
        isInventory={product.type === "inventory"}
      />
      <CertificateGallery title="Product Images" images={product.images} />

      <ProductBottomActionBar
        product={product}
        onApprove={handleApprove}
        onNotifyVendor={handleNotifyVendor}
      />
    </div>
  );
}
