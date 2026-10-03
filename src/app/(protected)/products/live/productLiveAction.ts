import { IProductLiveRow } from "@/types/product/productLive.types";
import { IVendorAction } from "../../vendors/vendorAction";

export function getProductLiveActions(
  product: IProductLiveRow & { vendorId: string },
  handlers: {
    onToggleLive: (id: string, nextStatus: "live" | "draft") => void;
    onGenerateQuotation: (vendorId: string, id: string) => void;
    onNotifyVendor: (id: string) => void;
  },
): IVendorAction[] {
  const toggleAction: IVendorAction = {
    actionName: product.liveStatus === "draft" ? "Publish" : "Set to draft",
    confirmMessage:
      product.liveStatus === "draft"
        ? `Publish "${product.productName}"? It will become visible and orderable.`
        : `Set "${product.productName}" back to draft? It will no longer be visible to customers.`,
    variant: product.liveStatus === "live" ? "destructive" : "default",
    method: () =>
      handlers.onToggleLive(
        product.productId,
        product.liveStatus === "draft" ? "live" : "draft",
      ),
  };

  const actions: IVendorAction[] = [toggleAction];

  // Quotation/notification only apply once the product is actually live
  if (product.liveStatus === "live") {
    if (product.type === "inventory") {
      actions.push({
        actionName: "Generate Rfq",
        method: () =>
          handlers.onGenerateQuotation(product.vendorId, product.productId),
      });
    } else {
      actions.push({
        actionName: "Notify vendor",
        confirmMessage: `Send a notification to the vendor to update stock for "${product.productName}"?`,
        method: () => handlers.onNotifyVendor(product.productId),
      });
    }
  }

  return actions;
}
