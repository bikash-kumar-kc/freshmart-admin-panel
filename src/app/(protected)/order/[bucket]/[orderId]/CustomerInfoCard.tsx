// orders/CustomerInfoCard.tsx
import { User, MapPin, Mail, Phone } from "lucide-react";
import { DetailSection } from "../../../vendors/[farmId]/DetailsSection";
import { ICustomerInfo } from "@/types/order/orderDetail.types";


export function CustomerInfoCard({ customer }: { customer: ICustomerInfo }) {
  return (
    <DetailSection
      title="Customer Information"
      items={[
        { icon: User, label: "Customer ID", value: customer.customerId },
        { icon: User, label: "Customer Name", value: customer.customerName },
        { icon: MapPin, label: "Address", value: customer.address },
        { icon: Mail, label: "Email", value: customer.email },
        { icon: Phone, label: "Phone", value: customer.phone },
      ]}
    />
  );
}