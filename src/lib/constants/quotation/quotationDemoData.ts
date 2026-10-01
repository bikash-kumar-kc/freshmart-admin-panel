import { IQuotationListRow, QuotationSubStatus } from "@/types/quotation/quotation.types";


const farms = ["Sunrise Organic Farm", "Green Valley Farm", "Himalayan Dairy", "Riverside Produce"];
const products = ["Apple (500g, 1000g)", "Milk (1L)", "Rice (5kg)", "Ghee (900ml)", "Spinach (250g)"];
const admins = ["Admin Sita", "Admin Raju"];

const statusCycle: Exclude<QuotationSubStatus, "all">[] = [
  "pending", "cancelled", "rechecking", "countered", "approved", "delivered",
];

function randomDate(daysAgoMax: number) {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * daysAgoMax));
  return d.toISOString();
}

export const quotationListDemoData: IQuotationListRow[] = Array.from({ length: 36 }, (_, i) => ({
  quotationId: `QT-${5000 + i}`,
  farmName: farms[i % farms.length],
  productName: products[i % products.length],
  requestedQuantity: 50 + i * 10,
  status: statusCycle[i % statusCycle.length],
  requestedBy: farms[i % farms.length],
  createdBy: admins[i % admins.length],
  createdAt: randomDate(60),
}));