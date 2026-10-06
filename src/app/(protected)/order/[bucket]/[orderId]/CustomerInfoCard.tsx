// app/(protected)/order/[bucket]/[orderId]/CustomerInfoCard.tsx
import { User, Mail, Phone } from "lucide-react";
import { DetailSection } from "../../../vendors/[farmId]/DetailsSection";

interface CustomerInfoCardProps {
  customer: { id: string; name: string | null; email: string } | null;
}

export function CustomerInfoCard({ customer }: CustomerInfoCardProps) {
  return (
    <DetailSection
      title="Customer Information"
      items={[
        { icon: User, label: "Customer ID", value: customer?.id ?? "—" },
        { icon: User, label: "Customer Name", value: customer?.name ?? "—" },
        { icon: Mail, label: "Email", value: customer?.email ?? "—" },
        // FAKE — no phone field on `users` table
        { icon: Phone, label: "Phone", value: "+977-9800000000" },
      ]}
    />
  );
}