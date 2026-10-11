// services/Vendors/VendorList.service.ts
import axios from "axios";

import { showToast } from "@/components/Toast";
import type {
  IVendorListQuery,
  IVendorListResponse,
} from "@/types/vendors/vendorList.types";
import { api } from "@/client/axios/client";
import {
  IVendorDetail,
  IVendorDetailResponse,
} from "@/types/vendors/vendorDetails.types";

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

class VendorListServices {
  async list(query: IVendorListQuery): Promise<IVendorListResponse> {
    try {
      const { data } = await api.get("/admin/vendor", { params: query });
      return data;
    } catch (error) {
      reportError("Failed to load vendors", error);
      throw error;
    }
  }

  async getDetail(farmId: string): Promise<IVendorDetailResponse> {
    try {
      const { data } = await api.get(`/admin/vendor/${farmId}`);
      return data;
    } catch (error) {
      reportError("Failed to load vendor detail", error);
      throw error;
    }
  }

  async approve(farmId: string) {
    try {
      console.log("we got it here....");
      const { data } = await api.patch(`/admin/vendor/${farmId}/approve`);
      return data;
    } catch (error) {
      reportError("Failed to approve vendor", error);
      throw error;
    }
  }

  async unapprove(farmId: string) {
    try {
      const { data } = await api.patch(`/admin/vendor/${farmId}/unapprove`);
      return data;
    } catch (error) {
      reportError("Failed to unapprove vendor", error);
      throw error;
    }
  }

  async softDelete(farmId: string) {
    try {
      const { data } = await api.patch(`/admin/vendor/${farmId}/delete`);
      return data;
    } catch (error) {
      reportError("Failed to delete vendor", error);
      throw error;
    }
  }
}

const vendorListServices = new VendorListServices();
export default vendorListServices;
