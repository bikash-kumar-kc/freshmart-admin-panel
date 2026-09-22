import { IProductLiveRow } from "@/types/product/productLive.types";

const names = [
  "Apple (500g)",
  "Milk (1L)",
  "Rice (5kg)",
  "Ghee (900ml)",
  "Spinach (250g)",
  "Egg (dozen)",
];
const stockStatuses: IProductLiveRow["stockStatus"][] = [
  "in_stock",
  "low_stock",
  "out_of_stock",
];

function randomOfferDate(): string | null {
  if (Math.random() < 0.4) return null;
  const days = Math.floor(Math.random() * 10) + 1;
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

export const productLiveDemoData: IProductLiveRow[] = Array.from(
  { length: 32 },
  (_, i) => {
    const liveStatus = i % 5 === 0 ? "draft" : "live";
    return {
      productId: `PLV-${3000 + i}`,
      productName: names[i % names.length],
      image:
        "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=600&q=80",
      type: i % 3 === 0 ? "display" : "inventory",
      liveStatus,
      stockStatus:
        liveStatus === "live" ? stockStatuses[i % stockStatuses.length] : null,
      totalStock: 20 + i * 5,
      totalSales: liveStatus === "live" ? 50 + i * 8 : 0,
      totalOrders: liveStatus === "live" ? 10 + i * 2 : 0,
      offerEndDate: liveStatus === "live" ? randomOfferDate() : null,
    };
  },
);
