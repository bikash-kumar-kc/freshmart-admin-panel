// app/vendors/[farmId]/page.tsx
"use client";

import { useParams } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Warehouse,
  Globe,
  MapPin,
  FileText,
} from "lucide-react";
import PageHeading from "@/components/PageHeading";
import { VendorProfileSection } from "./ProfileSectiont";
import { DetailSection } from "./DetailsSection";
import { CertificateGallery } from "./CertificateGallary";
import { VendorBottomActionBar } from "./VendorButtomActionBar";
import Motion from "@/lib/motion/motion";
import {
  useApproveVendorMutation,
  useDeleteVendorMutation,
  useUnapproveVendorMutation,
  useVendorDetailQuery,
} from "@/lib/hooks/vendor/vendorList.queries";
import { VendorPopularProducts } from "./VendorPopularProducts";

export default function VendorDetailPage() {
  const { farmId } = useParams<{ farmId: string }>();

  const { data, isLoading } = useVendorDetailQuery(farmId);

  // const { data, isLoading } = useVendorListQuery({ search, status, page, pageSize });

  const approveMutation = useApproveVendorMutation();
  const unapproveMutation = useUnapproveVendorMutation();
  const deleteMutation = useDeleteVendorMutation();

  const handleApprove = (id: string) => approveMutation.mutateAsync(id);
  const handleUnapprove = (id: string) => unapproveMutation.mutateAsync(id);
  const handleDelete = (id: string) => deleteMutation.mutateAsync(id);

  if (isLoading || !data) {
    return <p className="text-sm text-app-muted-foreground">Loading...</p>;
  }

  const { vendor, popularProducts } = data;

  return (
    <div className="space-y-5">
      <Motion delay={0.25}>
        <PageHeading
          title={vendor.farmName}
          message={`Vendor ID: ${vendor.farmId}`}
        />
      </Motion>

      <Motion delay={0.35}>
        <VendorProfileSection
          vendor={vendor}
          onApprove={() => handleApprove(vendor.farmId)}
          onUnapprove={() => handleUnapprove(vendor.farmId)}
          onDelete={() => handleDelete(vendor.farmId)}
        />
      </Motion>

      <Motion delay={0.45}>
        <DetailSection
          title="Personal Details"
          items={[
            { icon: User, label: "Farm Owner", value: vendor.farmOwner },
            { icon: Mail, label: "Email", value: vendor.email },
            { icon: Phone, label: "Phone", value: vendor.phone },
          ]}
        />
      </Motion>

      <Motion delay={0.5}>
        <DetailSection
          title="Farm Details"
          items={[
            { icon: Warehouse, label: "Farm Name", value: vendor.farmName },
            {
              icon: Globe,
              label: "Origin Country",
              value: vendor.farmOriginCountry,
            },
            {
              icon: MapPin,
              label: "Address / Location",
              value: vendor.farmAddress,
            },
            {
              icon: FileText,
              label: "Description",
              value: vendor.farmDescription,
            },
          ]}
        />
      </Motion>

      {vendor.status === "approved" && (
        <Motion delay={0.55}>
          <VendorPopularProducts products={popularProducts} />
        </Motion>
      )}
      <Motion delay={0.6}>
        <CertificateGallery
          title="PAN/VAT Certificate"
          images={[vendor.panVatCertificateUrl]}
        />
      </Motion>
      <Motion delay={0.65}>
        <CertificateGallery
          title="Organic Certified Certificate"
          images={vendor.organicCertificates}
        />
      </Motion>

      <Motion delay={0.7}>
        <VendorBottomActionBar
          vendor={vendor}
          onApprove={() => handleApprove(vendor.farmId)}
          onDelete={() => handleDelete(vendor.farmId)}
        />
      </Motion>
    </div>
  );
}
