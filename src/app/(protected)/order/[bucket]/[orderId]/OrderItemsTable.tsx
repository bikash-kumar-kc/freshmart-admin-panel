// app/(protected)/order/[bucket]/[orderId]/OrderItemsTable.tsx
import Image from "next/image";

interface OrderItemRow {
  productId: string;
  productName: string;
  image: string;
  quantity: number;
  price?: number | null; // real, from productVariants — Inventory only, nullable
}

export function OrderItemsTable({ items, totalDiscount }: { items: OrderItemRow[]; totalDiscount: number | null }) {
  return (
    <div className="bg-statcard-background border border-statcard-border rounded-sm p-5">
      <h3 className="text-sm font-semibold text-app-foreground mb-4">Order Items</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-app-border">
              <th className="text-left px-3 py-2 text-xs font-semibold text-statcard-label uppercase tracking-wide">Product</th>
              <th className="text-left px-3 py-2 text-xs font-semibold text-statcard-label uppercase tracking-wide">ID</th>
              <th className="text-right px-3 py-2 text-xs font-semibold text-statcard-label uppercase tracking-wide">Qty</th>
              <th className="text-right px-3 py-2 text-xs font-semibold text-statcard-label uppercase tracking-wide">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-app-border">
            {items.map((item) => (
              <tr key={item.productId}>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-sm overflow-hidden bg-app-border shrink-0 relative">
                      <Image src={item.image} alt={item.productName} fill className="object-cover" />
                    </div>
                    <span className="font-medium text-table-cell-text">{item.productName}</span>
                  </div>
                </td>
                <td className="px-3 py-3 text-table-cell-text">{item.productId}</td>
                <td className="px-3 py-3 text-right text-table-cell-text">{item.quantity}</td>
                <td className="px-3 py-3 text-right text-table-cell-text">
                  {item.price != null ? `Rs ${item.price * item.quantity}` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-3 pt-3 border-t border-app-border">
        <p className="text-sm text-app-foreground">
          <span className="text-statcard-label">Total Discount:</span>{" "}
          <span className="font-semibold">{totalDiscount !== null ? `Rs ${totalDiscount}` : "No discount"}</span>
        </p>
      </div>
    </div>
  );
}