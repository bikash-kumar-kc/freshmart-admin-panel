import {
  getDisplayStatusDisplay,
  inventoryStatusConfig,
} from "@/lib/constants/order/OrderStatusConfit";
import { formatTimestamp } from "@/lib/utilis/timeFormatter";
import { DisplayOrderStatus } from "@/types/order/order.types";
import { IOrderDetail } from "@/types/order/orderDetail.types";

const paymentLabels: Record<string, string> = {
  stripe: "Stripe",
  khalti: "Khalti",
  esewa: "eSewa",
};

export function OrderInfoCard({ order }: { order: IOrderDetail }) {
  const status =
    order.type === "inventory"
      ? inventoryStatusConfig[
          order.status as keyof typeof inventoryStatusConfig
        ]
      : getDisplayStatusDisplay(
          order.status as DisplayOrderStatus,
          order.completionReason ?? null,
        );

  const rows: { label: string; value: string }[] = [
    { label: "Order ID", value: order.orderId },
    { label: "Total Items", value: String(order.totalItems) },
    { label: "Total Quantity", value: String(order.totalQuantity) },
    { label: "Total Amount", value: `Rs ${order.totalAmount}` },
    {
      label: "Discount",
      value:
        order.totalDiscount !== null
          ? `Rs ${order.totalDiscount}`
          : "No discount",
    },
    { label: "Placed Date", value: formatTimestamp(order.placedDate) },
  ];

  if (order.type === "inventory") {
    rows.push(
      { label: "Payment Method", value: paymentLabels[order.paymentMethod!] },
      { label: "Delivery Address", value: order.deliveryAddress! },
      {
        label: "Expected Date",
        value: order.expectedDate ? formatTimestamp(order.expectedDate) : "—",
      },
    );
  } else {
    rows.push(
      { label: "Vendor", value: order.farmName! },
      {
        label: "Confirmation Deadline",
        value: formatTimestamp(order.confirmationDeadline!),
      },
    );
  }

  return (
    <div className="bg-statcard-background border border-statcard-border rounded-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-app-foreground">
          Order Information
        </h3>
        <span
          className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${status.badgeClass}`}
        >
          {status.label}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="p-3 rounded-sm transition-all hover:bg-brand-primary hover:text-white hover:shadow-md group"
          >
            <p className="text-xs text-statcard-label group-hover:text-white/80">{row.label}</p>
            <p className="text-sm font-medium text-app-foreground mt-0.5">
              {row.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
