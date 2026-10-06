// services/order/order.service.ts
import axios from "axios";
import { showToast } from "@/components/Toast";
import type {
  IOrderListQuery,
  IOrderListResponse,
  IInventoryOrderRow,
  IDisplayOrderRow,
  InventoryOrderStatus,
} from "@/types/order/order.types";
import { api } from "@/client/axios/client";

function reportError(title: string, error: unknown) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    showToast.error(
      title,
      Array.isArray(message)
        ? message.join(", ")
        : (message ?? "Please try again."),
    );
  } else {
    showToast.error(title, "Something went wrong.");
  }
}

class OrderServices {
  async listInventory(
    query: IOrderListQuery,
  ): Promise<IOrderListResponse<IInventoryOrderRow>> {
    try {
      const { data } = await api.get("/admin/orders/inventory", {
        params: query,
      });
      return data;
    } catch (error) {
      // reportError("Failed to load inventory orders", error);
      throw error;
    }
  }

  async listDisplay(
    query: IOrderListQuery,
  ): Promise<IOrderListResponse<IDisplayOrderRow>> {
    try {
      const { data } = await api.get("/admin/orders/display", {
        params: query,
      });
      return data;
    } catch (error) {
      // reportError("Failed to load display orders", error);
      throw error;
    }
  }

  async getInventoryDetail(orderId: string) {
    try {
      const { data } = await api.get(`/admin/orders/inventory/${orderId}`);
      return data;
    } catch (error) {
      // reportError("Failed to load order detail", error);
      throw error;
    }
  }

  async getDisplayDetail(orderId: string) {
    try {
      const { data } = await api.get(`/admin/orders/display/${orderId}`);
      return data;
    } catch (error) {
      // reportError("Failed to load order detail", error);
      throw error;
    }
  }

  async updateInventoryStatus(orderId: string, status: InventoryOrderStatus) {
    try {
      const { data } = await api.patch(
        `/admin/orders/inventory/${orderId}/status`,
        { status },
      );
      return data;
    } catch (error) {
      // reportError("Failed to update order status", error);
      throw error;
    }
  }
}

const orderServices = new OrderServices();
export default orderServices;
