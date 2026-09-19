import { IProductListingRow } from "@/types/product/productListing/productlisting.types";


const productNames = ["Apple", "Milk", "Rice", "Ghee", "Spinach", "Tomato", "Egg", "Wheat Flour"];
const farms = ["Sunrise Organic Farm", "Green Valley Farm", "Himalayan Dairy", "Riverside Produce"];
const sizes = [
  { size: 500, unit: "g" },
  { size: 1000, unit: "ml" },
  { size: 1, unit: "kg" },
  { size: 250, unit: "g" },
];

function randomDate(daysAgoMax: number) {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * daysAgoMax));
  return d.toISOString();
}

export const productListingDemoData: IProductListingRow[] = Array.from({ length: 38 }, (_, i) => {
  const name = productNames[i % productNames.length];
  const { size, unit } = sizes[i % sizes.length];
  return {
    productId: `PL-${2000 + i}`,
    farmName: farms[i % farms.length],
    productName: `${name} (${size}${unit})`,
    localName: name,
    type: i % 3 === 0 ? "display" : "inventory",
    quantity: 50 + i * 7,
    unitPrice: 100 + i * 15,
    status: i % 4 === 0 ? "unapproved" : "approved",
    createdAt: randomDate(90),
  };
});