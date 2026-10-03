import { OrderBucket } from "@/types/order/order.types";
import { IOrderDetail } from "@/types/order/orderDetail.types";

export function getOrderDetailDemoData(
  orderId: string,
  type: OrderBucket = "inventory",
): IOrderDetail {
  const items = [
    {
      productId: "PLV-3001",
      productName: "Apple (500g)",
      image:
        "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=600&q=80",
      quantity: 3,
      amount: 900,
      discount: 50,
    },
    {
      productId: "PLV-3002",
      productName: "Milk (1L)",
      image:
        "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=600&q=80",
      quantity: 2,
      amount: 180,
      discount: null,
    },
  ];

  const base: IOrderDetail = {
    orderId,
    type,
    status: type === "inventory" ? "shipped" : "processing",
    totalItems: items.length,
    totalQuantity: items.reduce((s, i) => s + i.quantity, 0),
    totalAmount: items.reduce((s, i) => s + i.amount, 0),
    totalDiscount: items.reduce((s, i) => s + (i.discount ?? 0), 0) || null,
    placedDate: new Date(Date.now() - 3 * 86400000).toISOString(),
    items,
    customer: {
      customerId: "CUST-4421",
      customerName: "Ramesh K.",
      address: "Ward 5, Thamel, Kathmandu, Nepal",
      email: "ramesh.k@example.com",
      phone: "+977-9801234567",
    },
  };

  if (type === "inventory") {
    return {
      ...base,
      paymentMethod: "khalti",
      deliveryAddress: base.customer.address,
      expectedDate: new Date(Date.now() + 2 * 86400000).toISOString(),
    };
  }

  return {
    ...base,
    completionReason: null,
    farmName: "Sunrise Organic Farm",
    confirmationDeadline: new Date(Date.now() + 40 * 60000).toISOString(),
  };
}
