"use client";

import {
  needsAction,
  stockStatusConfig,
} from "@/lib/constants/dashboard/statusBadge";
import { ITopProduct } from "@/types/dashboard/topProduct.types";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TopProductsCard({ product }: { product: ITopProduct }) {
  const router = useRouter();
  const status = stockStatusConfig[product.status];

  // handle routing...
  function handleAction() {
    if (product.type === "inventory") {
      router.push(`/quotation/create?productId=${product.id}`);
    } else {
      router.push(
        `/notifications/createQuotation?vendorId=${product.vendorId}&productId=${product.id}`,
      );
    }
  }

  return (
    <div className="border border-app-border rounded-sm p-4 bg-statcard-background">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-sm overflow-hidden bg-app-border shrink-0 relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-semibold text-app-foreground truncate">
              {product.name}
            </p>
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0 ${status.badgeClass}`}
            >
              {status.label}
            </span>
          </div>
          <p className="text-xs text-app-muted-foreground mt-0.5">
            {product.productId}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-app-border">
        <div>
          <p className="text-[11px] text-app-muted-foreground">Sales</p>
          <p className="text-sm font-medium text-app-foreground">
            {product.sales.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-app-muted-foreground">Earning</p>
          <p className="text-sm font-medium text-app-foreground">
            ${product.earning.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-app-muted-foreground">Stock</p>
          <p className="text-sm font-medium text-app-foreground">
            {product.stock}
          </p>
        </div>
      </div>

      <div className="w-full flex justify-end">
        {needsAction(product.status) && (
          <button
            onClick={handleAction}
            className=" mt-3 px-3 py-1.5 rounded-sm text-xs font-semibold border border-green-500 text-green-600 bg-app-background transition-colors hover:bg-green-700 hover:text-white hover:border-green-700 text-right"
          >
            {product.type === "inventory"
              ? "Generate RFQ"
              : "Generate notification"}
          </button>
        )}
      </div>
    </div>
  );
}
