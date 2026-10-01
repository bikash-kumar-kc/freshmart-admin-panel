// products/productDetail.types.ts
export interface IProductOffer {
  isActive: boolean;
  createdAt: string | null; // ISO
  validUntil: string | null; // ISO
}

export interface IProductSalesTrendPoint {
  date: string; // ISO, one per day
  sales: number;
}

export interface IProductOrder {
  orderId: string;
  customerName: string;
  quantity: number;
  status: string; // order status label, meaning differs by product type
  createdAt: string;
}

export interface IProductLiveDetail {
  productId: string;
  productName: string;
  image: string;
  type: "inventory" | "display";
  liveStatus: "draft" | "live";
  offer: IProductOffer;
  totalSales: number;
  totalRevenue: number;
  totalOrders: number;
  currentStock: number;
  salesTrend: IProductSalesTrendPoint[];
  recentOrders: IProductOrder[];
}