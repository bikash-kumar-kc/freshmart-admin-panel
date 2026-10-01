import { IProductLiveDetail } from "@/types/product/productLiveDetails.types";

function generateSalesTrend(days: number) {
  return Array.from({ length: days }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (days - i));
    return {
      date: d.toISOString(),
      sales: Math.round(15 + Math.sin(i / 4) * 8 + Math.random() * 6),
    };
  });
}

export function getProductLiveDetailDemoData(
  productId: string,
): IProductLiveDetail {
  return {
    productId,
    productName: "Apple (500g)",
    image: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=600&q=80",
    type: "inventory",
    liveStatus: "live",
    offer: {
      isActive: true,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      validUntil: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    totalSales: 842,
    totalRevenue: 25260,
    totalOrders: 213,
    currentStock: 87,
    salesTrend: generateSalesTrend(30),
    recentOrders: [
      {
        orderId: "ORD-8821",
        customerName: "Ramesh K.",
        quantity: 3,
        status: "Delivered",
        createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
      },
      {
        orderId: "ORD-8809",
        customerName: "Sita G.",
        quantity: 1,
        status: "Processing",
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      },
      {
        orderId: "ORD-8790",
        customerName: "Bikash T.",
        quantity: 5,
        status: "Delivered",
        createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      },
      {
        orderId: "ORD-8776",
        customerName: "Anita P.",
        quantity: 2,
        status: "Cancelled",
        createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
      },
      {
        orderId: "ORD-8754",
        customerName: "Prakash M.",
        quantity: 4,
        status: "Delivered",
        createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
      },
    ],
  };
}
