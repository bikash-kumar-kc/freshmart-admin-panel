import { IDisplayOrderRow, IInventoryOrderRow } from "@/types/order/order.types";


const customers = ["Ramesh K.", "Sita G.", "Bikash T.", "Anita P.", "Prakash M."];
const farms = ["Sunrise Organic Farm", "Green Valley Farm", "Himalayan Dairy"];
const paymentMethods: IInventoryOrderRow["paymentMethod"][] = ["stripe", "khalti", "esewa"];
const inventoryStatuses: IInventoryOrderRow["status"][] = ["processing", "shipped", "delivered", "cancelled"];

function randomDate(daysAgoMax: number) {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * daysAgoMax));
  return d.toISOString();
}

export const inventoryOrderDemoData: IInventoryOrderRow[] = Array.from({ length: 30 }, (_, i) => {
  const status = inventoryStatuses[i % inventoryStatuses.length];
  return {
    orderId: `ORD-${9000 + i}`,
    customerName: customers[i % customers.length],
    totalItems: 2 + (i % 3),
    totalQuantity: 4 + (i % 3) * 3,
    discount: i % 4 === 0 ? 50 + i : null,
    paymentMethod: paymentMethods[i % paymentMethods.length],
    status,
    orderDate: randomDate(45),
    deliveryDate: status === "delivered" ? randomDate(5) : null,
  };
});

export const displayOrderDemoData: IDisplayOrderRow[] = Array.from({ length: 22 }, (_, i) => {
  const statuses: IDisplayOrderRow["status"][] = ["pending", "processing", "delivered", "delivered", "cancelled"];
  const status = statuses[i % statuses.length];
  const deadline = new Date();
  deadline.setHours(deadline.getHours() + (status === "pending" ? 1 : -2));

  return {
    orderId: `DSP-${9500 + i}`,
    customerName: customers[i % customers.length],
    farmName: farms[i % farms.length],
    totalItems: 1 + (i % 2),
    totalQuantity: 2 + (i % 2) * 2,
    status,
    completionReason: status === "delivered" ? (i % 2 === 0 ? "vendor_confirmed" : "timeout") : null,
    confirmationDeadline: deadline.toISOString(),
    orderDate: randomDate(20),
  };
});