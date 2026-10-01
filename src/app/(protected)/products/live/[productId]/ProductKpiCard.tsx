// products/ProductStatCards.tsx
import { IProductLiveDetail } from "@/types/product/productLiveDetails.types";
import { ShoppingCart, DollarSign, Package, Archive } from "lucide-react";


export function ProductStatCards({ product }: { product: IProductLiveDetail }) {
  const stats = [
    { label: "Total Sales", value: product.totalSales.toLocaleString(), icon: ShoppingCart, iconBg: "var(--brand-primary-soft)", iconColor: "var(--brand-primary)" },
    { label: "Total Revenue", value: `Rs ${product.totalRevenue.toLocaleString()}`, icon: DollarSign, iconBg: "var(--status-approved-bg)", iconColor: "var(--status-approved-text)" },
    { label: "Total Orders", value: product.totalOrders.toLocaleString(), icon: Package, iconBg: "var(--status-inprogress-bg)", iconColor: "var(--status-inprogress-text)" },
    { label: "Current Stock", value: product.currentStock.toLocaleString(), icon: Archive, iconBg: "var(--brand-cta-soft)", iconColor: "var(--brand-cta)" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="bg-statcard-background border border-statcard-border rounded-sm p-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0" style={{ backgroundColor: stat.iconBg }}>
                <Icon size={16} style={{ color: stat.iconColor }} />
              </div>
              <p className="text-xs font-medium text-statcard-label">{stat.label}</p>
            </div>
            <p className="text-xl font-semibold text-statcard-value mt-3">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
}