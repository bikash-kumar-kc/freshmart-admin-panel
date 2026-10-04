import { api } from "@/client/axios/client";
import { showToast } from "@/components/Toast";
import {
  ITopProduct,
  TopProductsPeriod,
} from "@/types/dashboard/topProduct.types";
import { ProductStockStatus } from "@/types/product/productLive.types";
import axios from "axios";

class DashboardServices {
  async getTopProducts(
    period: TopProductsPeriod,
    status: ProductStockStatus | "all",
  ): Promise<ITopProduct[]> {
    try {
      const { data } = await api.get<ITopProduct[]>(
        "/admin/dashboard/top-products",
        {
          params: { period, status: status === "all" ? undefined : status },
        },
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // const message = error.response?.data?.message;
        // showToast.error(
        //   "Failed to load top products",
        //   Array.isArray(message)
        //     ? message.join(", ")
        //     : (message ?? "Please try again."),
        // );
      } else {
        // showToast.error("Failed to load top products", "Something went wrong.");
      }
      throw error;
    }
  }
}

const dashboardServices = new DashboardServices();
export default dashboardServices;
