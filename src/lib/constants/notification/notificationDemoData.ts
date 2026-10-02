import type{ INotificationItem, NotificationSubType } from "@/types/notification/notification.types";


const subTypes: NotificationSubType[] = [
  "inventory_order", "quotation_countered", "quotation_approved", "vendor_registration", "productListed",
];

const messages: Record<NotificationSubType, string> = {
  inventory_order: "New order placed for Rice (5kg) — 3 units requested",
  quotation_countered: "Sunrise Organic Farm countered your quotation for Apple",
  quotation_approved: "Green Valley Farm accepted your quotation for Tomato",
  vendor_registration: "Himalayan Dairy submitted a new vendor application",
  productListed: "Riverside Produce listed a new product: Spinach (250g)",
};

const referenceByType: Record<NotificationSubType, { referenceType: INotificationItem["referenceType"]; referenceId: string }> = {
  inventory_order: { referenceType: null, referenceId: null as unknown as string },
  quotation_countered: { referenceType: "quotation", referenceId: "QT-5003" },
  quotation_approved: { referenceType: "quotation", referenceId: "QT-5004" },
  vendor_registration: { referenceType: "vendor", referenceId: "FM-1005" },
  productListed: { referenceType: "productListing", referenceId: "PL-2015" },
};

function randomDate(daysAgoMax: number) {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * daysAgoMax));
  return d.toISOString();
}

export const notificationDemoData: INotificationItem[] = Array.from({ length: 24 }, (_, i) => {
  const subType = subTypes[i % subTypes.length];
  const ref = referenceByType[subType];
  return {
    id: `NTF-${7000 + i}`,
    subType,
    message: messages[subType],
    isRead: i % 3 === 0,
    referenceType: ref.referenceType,
    referenceId: ref.referenceId,
    createdAt: randomDate(20),
  };
});