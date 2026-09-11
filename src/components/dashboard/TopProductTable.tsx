"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import ReusableTable, { IColumn } from "../ReuseableTable";
import { ITopProduct } from "@/types/dashboard/topProduct.types";
import {
  needsAction,
  stockStatusConfig,
} from "@/lib/constants/dashboard/statusBadge";

const columns: IColumn[] = [
  { id: "product", label: "Product Name" },
  { id: "productId", label: "Product ID" },
  { id: "sales", label: "Sales", align: "right" },
  { id: "earning", label: "Earning", align: "right" },
  { id: "stock", label: "Stock", align: "right" },
  { id: "status", label: "Status", align: "center" },
  { id: "action", label: "Action", align: "right" },
];

export default function TopProductsTable({
  data,
  isLoading,
}: {
  data: ITopProduct[];
  isLoading: boolean;
}) {
  const router = useRouter();

  function handleAction(product: ITopProduct) {
    if (product.type === "inventory") {
      router.push(`/quotation/create?productId=${product.id}`);
    } else {
      router.push(`/notifications/create?productId=${product.id}`);
    }
  }

  function renderRow(product: ITopProduct) {
    const status = stockStatusConfig[product.status];
    return (
      <>
        <td className="px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm overflow-hidden bg-app-border shrink-0 relative">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="font-medium text-table-cell-text">
              {product.name}
            </span>
          </div>
        </td>
        <td className="px-4 py-3 text-table-cell-text">{product.productId}</td>
        <td className="px-4 py-3 text-right text-table-cell-text">
          {product.sales.toLocaleString()}
        </td>
        <td className="px-4 py-3 text-right text-table-cell-text">
          ${product.earning.toLocaleString()}
        </td>
        <td className="px-4 py-3 text-right text-table-cell-text">
          {product.stock}
        </td>
        <td className="px-4 py-3 text-center">
          <span
            className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${status.badgeClass}`}
          >
            {status.label}
          </span>
        </td>
        <td className="px-4 py-3 text-right">
          {needsAction(product.status) && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAction(product);
              }}
              className="px-3 py-1.5 rounded-sm text-xs font-semibold border border-green-500 text-green-600 bg-app-background transition-colors hover:bg-green-700 hover:text-white hover:border-green-700"
            >
              {product.type === "inventory"
                ? "Generate RFQ"
                : "Generate notification"}
            </button>
          )}
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
      rowKey={(item) => item.id}
      emptyMessage="No products found."
    />
  );
}
