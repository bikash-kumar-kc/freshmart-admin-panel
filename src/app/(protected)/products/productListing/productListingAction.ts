import { IVendorAction } from "@/app/(protected)/vendors/vendorAction";
import { IProductListingRow } from "@/types/product/productListing/productlisting.types";


export function getProductListingActions(
  product: IProductListingRow,
  handlers: {
    onApprove: (id: string) => void;
    onGenerateQuotation: (id: string) => void;
    onNotifyVendor: (id: string) => void;
  },
): IVendorAction[] {
  if (product.status === "unapproved") {
    return [
      {
        actionName: "Approve",
        confirmMessage: `Approve "${product.productName}" from ${product.farmName}?`,
        method: () => handlers.onApprove(product.productId),
      },
    ];
  }

  // approved
  if (product.type === "inventory") {
    return [
      {
        actionName: "RFQ",
        method: () => handlers.onGenerateQuotation(product.productId), // navigates, no confirm needed
      },
    ];
  }

  // approved + display
  return [
    {
      actionName: "Notify vendor",
      confirmMessage: `Send a notification to ${product.farmName} to update stock for "${product.productName}"?`,
      method: () => handlers.onNotifyVendor(product.productId),
    },
  ];
}