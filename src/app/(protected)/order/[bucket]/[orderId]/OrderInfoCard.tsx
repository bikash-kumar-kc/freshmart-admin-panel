// app/(protected)/order/[bucket]/[orderId]/OrderInfoCard.tsx
import {
  getDisplayStatusDisplay,
  inventoryStatusConfig,
} from "@/lib/constants/order/OrderStatusConfit";
import { formatTimestamp } from "@/lib/utilis/timeFormatter";
import type { OrderBucket } from "@/types/order/order.types";

// FAKE — no backing column on `orders`. Shown as placeholder until a real field exists.
const FAKE_PAYMENT_METHOD = "khalti";
const paymentLabels: Record<string, string> = { stripe: "Stripe", khalti: "Khalti", esewa: "eSewa" };

interface OrderInfoCardProps {
  bucket: OrderBucket;
  order: {
    id: string;
    orderStatus?: string | null; // inventory
    displayOrderStatus?: string | null; // display
    vendorConfirmationDeadline?: string | null; // display
    totalPrice?: number | null;
    totalPriceAfterDiscount?: number | null;
    createdAt: string;
  };
  items: { quantity: number }[];
  farmName?: string | null; // display only, from joined vendor
}

export function OrderInfoCard({ bucket, order, items, farmName }: OrderInfoCardProps) {
  console.log(order)
  const status =
    bucket === "inventory"
      ? inventoryStatusConfig[order.orderStatus as keyof typeof inventoryStatusConfig]
      : getDisplayStatusDisplay(order.displayOrderStatus as any, null); 

  const totalItems = items.length;
  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalDiscount =
    order.totalPrice != null && order.totalPriceAfterDiscount != null
      ? order.totalPrice - order.totalPriceAfterDiscount
      : null;

      console.log(order.totalPrice)
  const rows: { label: string; value: string }[] = [
    { label: "Order ID", value: order.id },
    { label: "Total Items", value: String(totalItems) },
    { label: "Total Quantity", value: String(totalQuantity) },
    { label: "Total Amount", value: order?.totalPrice ? `Rs ${order?.totalPrice}` : "—" },
    { label: "Discount", value: totalDiscount !== null ? `Rs ${totalDiscount}` : "No discount" },
    { label: "Placed Date", value: formatTimestamp(order.createdAt) },
  ];

  if (bucket === "inventory") {
    rows.push(
      // FAKE — no payment-method column on `orders` yet
      { label: "Payment Method", value: paymentLabels[FAKE_PAYMENT_METHOD] },
      // FAKE — no delivery-address field on `orders` yet
      { label: "Delivery Address", value: "Ward 5, Thamel, Kathmandu, Nepal" },
      // FAKE — no expected-date column on `orders` yet
      { label: "Expected Date", value: "—" },
    );
  } else {
    rows.push(
      { label: "Vendor", value: farmName ?? "—" },
      {
        label: "Confirmation Deadline",
        value: order.vendorConfirmationDeadline ? formatTimestamp(order.vendorConfirmationDeadline) : "—",
      },
    );
  }

  return (
    <div className="bg-statcard-background border border-statcard-border rounded-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-app-foreground">Order Information</h3>
        <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${status.badgeClass}`}>{status.label}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="p-3 rounded-sm transition-all hover:bg-brand-primary hover:text-white hover:shadow-md group"
          >
            <p className="text-xs text-statcard-label group-hover:text-white/80">{row.label}</p>
            <p className="text-sm font-medium text-app-foreground mt-0.5">{row.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}