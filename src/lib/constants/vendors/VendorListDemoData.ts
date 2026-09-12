import { IVendorListItem } from "@/types/vendors/vendorList.types";


const firstNames = ["Sunrise", "Green Valley", "Golden Field", "Himalayan", "Riverside", "Terrace"];
const suffixes = ["Organic Farm", "Agro", "Dairy", "Produce Co.", "Farms"];
const statuses: IVendorListItem["status"][] = ["approved", "unapproved", "deleted"];

function randomDate(daysAgoMax: number) {
  const daysAgo = Math.floor(Math.random() * daysAgoMax);
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
}

export const vendorListDemoData: IVendorListItem[] = Array.from({ length: 47 }, (_, i) => {
  const status = statuses[i % 7 === 0 ? 2 : i % 3 === 0 ? 1 : 0]; // mostly approved, some unapproved, occasional deleted
  return {
    farmId: `FM-${1000 + i}`,
    farmName: `${firstNames[i % firstNames.length]} ${suffixes[i % suffixes.length]}`,
    location: {
      ward: `Ward ${(i % 12) + 1}`,
      municipality: "Bhaktapur Municipality",
      district: "Bhaktapur",
      province: "Bagmati Province",
      country: "Nepal",
    },
    email: `vendor${i}@example.com`,
    phone: `+977-98${String(10000000 + i).slice(0, 8)}`,
    status,
    createdAt: randomDate(120),
  };
});