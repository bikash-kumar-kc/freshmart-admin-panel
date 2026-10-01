"use client";
import ReusableTable, { IColumn } from "@/components/ReuseableTable";
import { formatTimestamp } from "@/lib/utilis/timeFormatter";
import {
  IProductLiveDetail,
  IProductOrder,
} from "@/types/product/productLiveDetails.types";
import { useRouter } from "next/navigation";

const columns: IColumn[] = [
  { id: "orderId", label: "Order ID" },
  { id: "customer", label: "Customer" },
  { id: "quantity", label: "Qty", align: "right" },
  { id: "status", label: "Status", align: "center" },
  { id: "viewDetails", label: "Details", align: "center" },
  { id: "createdAt", label: "Date" },
];

const orderStatusColorMap: Record<string, string> = {
  Delivered: "bg-status-approved-bg text-status-approved-text",
  Processing: "bg-status-inprogress-bg text-status-inprogress-text",
  Pending: "bg-status-awaiting-bg text-status-awaiting-text",
  Cancelled: "bg-status-rejected-bg text-status-rejected-text",
};

export function ProductRecentOrders({
  orders,
  productType,
}: {
  orders: IProductOrder[];
  productType: IProductLiveDetail["type"];
}) {
  function RenderRow(order: IProductOrder) {
    const router = useRouter();
    return (
      <>
        <td className="px-4 py-3 text-table-cell-text font-medium">
          {order.orderId}
        </td>
        <td className="px-4 py-3 text-table-cell-text">{order.customerName}</td>
        <td className="px-4 py-3 text-right text-table-cell-text">
          {order.quantity}
        </td>
        <td className="px-4 py-3 text-center">
          <span
            className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
              orderStatusColorMap[order.status] ??
              "bg-status-neutral-bg text-status-neutral-text"
            }`}
          >
            {order.status}
          </span>
        </td>
        <td className="px-4 py-3 text-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/orders/${order.orderId}`);
            }}
            className="px-3 py-1.5 rounded-sm text-xs font-medium border border-green-500 text-green-600 bg-app-background transition-colors hover:bg-green-700 hover:text-white hover:border-green-700"
          >
            Details
          </button>
        </td>
        <td className="px-4 py-3 text-table-cell-text whitespace-nowrap text-xs">
          {formatTimestamp(order.createdAt)}
        </td>
      </>
    );
  }

  return (
    <div className="bg-statcard-background border border-statcard-border rounded-sm p-5">
      <h3 className="text-sm font-semibold text-app-foreground mb-4">
        Recent Orders{" "}
        {productType === "display" && (
          <span className="text-app-muted-foreground font-normal">
            (vendor-fulfilled)
          </span>
        )}
      </h3>
      <ReusableTable
        columns={columns}
        data={orders}
        renderRow={RenderRow}
        rowKey={(item) => item.orderId}
        emptyMessage="No orders yet."
      />
    </div>
  );
}
