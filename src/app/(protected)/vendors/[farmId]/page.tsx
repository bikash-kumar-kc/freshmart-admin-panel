// app/vendors/[farmId]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { User, Mail, Phone, Warehouse, Globe, MapPin, FileText } from "lucide-react";
import PageHeading from "@/components/PageHeading";
import { useVendorDetailQuery } from "@/lib/hooks/vendor/useVendorDetials";
import { vendorKeys } from "@/lib/hooks/vendor/vendorList.queries";
import { VendorProfileSection } from "./ProfileSectiont";
import { DetailSection } from "./DetailsSection";
import { CertificateGallery } from "./CertificateGallary";
import { VendorPopularProducts } from "./VendorPopularProducts";
import { VendorBottomActionBar } from "./VendorButtomActionBar";


export default function VendorDetailPage() {
  const { farmId } = useParams<{ farmId: string }>();
  const queryClient = useQueryClient();
  const { data, isLoading } = useVendorDetailQuery(farmId);

  function invalidate() {
    queryClient.invalidateQueries({ queryKey: vendorKeys.all });
  }
  function handleApprove() {
    console.log("approve", farmId);
    invalidate();
  }
  function handleUnapprove() {
    console.log("unapprove", farmId);
    invalidate();
  }
  function handleDelete() {
    console.log("delete", farmId);
    invalidate();
  }

  if (isLoading || !data) {
    return <p className="text-sm text-app-muted-foreground">Loading...</p>;
  }

  const { vendor, popularProducts } = data;

  return (
    <div className="space-y-5">
      <PageHeading title={vendor.farmName} message={`Vendor ID: ${vendor.farmId}`} />

      <VendorProfileSection
        vendor={vendor}
        onApprove={handleApprove}
        onUnapprove={handleUnapprove}
        onDelete={handleDelete}
      />

      <DetailSection
        title="Personal Details"
        items={[
          { icon: User, label: "Farm Owner", value: vendor.farmOwner },
          { icon: Mail, label: "Email", value: vendor.email },
          { icon: Phone, label: "Phone", value: vendor.phone },
        ]}
      />

      <DetailSection
        title="Farm Details"
        items={[
          { icon: Warehouse, label: "Farm Name", value: vendor.farmName },
          { icon: Globe, label: "Origin Country", value: vendor.farmOriginCountry },
          { icon: MapPin, label: "Address / Location", value: vendor.farmAddress },
          { icon: FileText, label: "Description", value: vendor.farmDescription },
        ]}
      />

      <CertificateGallery title="PAN/VAT Certificate" images={[vendor.panVatCertificateUrl]} />
      <CertificateGallery title="Organic Certified Certificate" images={vendor.organicCertificates} />

      {vendor.status === "approved" && <VendorPopularProducts products={popularProducts} />}

      <VendorBottomActionBar vendor={vendor} onApprove={handleApprove} onDelete={handleDelete} />
    </div>
  );
}