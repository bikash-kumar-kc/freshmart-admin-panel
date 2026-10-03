
"use client";

import ReusableTable, { IColumn } from "@/components/ReuseableTable";
import { getDisplayStatusDisplay } from "@/lib/constants/order/OrderStatusConfit";
import { formatTimestamp } from "@/lib/utilis/timeFormatter";
import { IDisplayOrderRow } from "@/types/order/order.types";
import { useRouter } from "next/navigation";

const columns: IColumn[] = [
  { id: "orderId", label: "Order ID" },
  { id: "customer", label: "Customer" },
  { id: "farmName", label: "Farm Name" },
  { id: "totalItems", label: "Items", align: "right" },
  { id: "totalQuantity", label: "Qty", align: "right" },
  { id: "status", label: "Status", align: "center" },
  { id: "deadline", label: "Confirmation Deadline" },
  { id: "orderDate", label: "Order Date" },
  { id: "details", label: "Details", align: "center" },
];

export default function DisplayOrderTable({
  data,
  isLoading,
}: {
  data: IDisplayOrderRow[];
  isLoading: boolean;
}) {
  const router = useRouter();

  function renderRow(order: IDisplayOrderRow) {
    const status = getDisplayStatusDisplay(
      order.status,
      order.completionReason,
    );

    return (
      <>
        <td className="px-4 py-3 text-table-cell-text">{order.orderId}</td>
        <td className="px-4 py-3 text-table-cell-text">{order.customerName}</td>
        <td className="px-4 py-3 text-table-cell-text">{order.farmName}</td>
        <td className="px-4 py-3 text-right text-table-cell-text">
          {order.totalItems}
        </td>
        <td className="px-4 py-3 text-right text-table-cell-text">
          {order.totalQuantity}
        </td>
        <td className="px-4 py-3 text-center">
          <span
            className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${status.badgeClass}`}
          >
            {status.label}
          </span>
        </td>
        <td className="px-4 py-3 text-table-cell-text whitespace-nowrap text-xs">
          {formatTimestamp(order.confirmationDeadline)}
        </td>
        <td className="px-4 py-3 text-table-cell-text whitespace-nowrap text-xs">
          {formatTimestamp(order.orderDate)}
        </td>
        <td className="px-4 py-3 text-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/order/display/${order.orderId}`);
            }}
            className="px-3 py-1.5 rounded-sm text-xs font-medium border border-green-500 text-app-foreground bg-app-background transition-colors hover:bg-green-700 hover:text-white hover:border-green-700"
          >
            View details
          </button>
        </td>
      </>
    );
  }

  return (
    <ReusableTable
      columns={columns}
      data={data}
      renderRow={renderRow}
      loading={isLoading}
      rowKey={(item) => item.orderId}
      emptyMessage="No orders found."
    />
  );
}
