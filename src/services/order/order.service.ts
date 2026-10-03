import { displayOrderDemoData, inventoryOrderDemoData } from "@/lib/constants/order/OrderListDemoData";
import type{ IOrderListQuery } from "@/types/order/order.types";


class OrderServices {
  async listInventory(query: IOrderListQuery) {
    await new Promise((r) => setTimeout(r, 300));
    let filtered = [...inventoryOrderDemoData];

    if (query.status !== "all") filtered = filtered.filter((o) => o.status === query.status);
    if (query.search?.trim()) {
      const s = query.search.trim().toLowerCase();
      filtered = filtered.filter((o) => o.orderId.toLowerCase().includes(s));
    }

    if (query.search?.trim()) return { data: filtered, total: filtered.length, page: 1, pageSize: filtered.length };

    const start = (query.page - 1) * query.pageSize;
    return { data: filtered.slice(start, start + query.pageSize), total: filtered.length, page: query.page, pageSize: query.pageSize };
  }

  async listDisplay(query: IOrderListQuery) {
    await new Promise((r) => setTimeout(r, 300));
    let filtered = [...displayOrderDemoData];

    if (query.status !== "all") filtered = filtered.filter((o) => o.status === query.status);
    if (query.search?.trim()) {
      const s = query.search.trim().toLowerCase();
      filtered = filtered.filter((o) => o.orderId.toLowerCase().includes(s));
    }

    if (query.search?.trim()) return { data: filtered, total: filtered.length, page: 1, pageSize: filtered.length };

    const start = (query.page - 1) * query.pageSize;
    return { data: filtered.slice(start, start + query.pageSize), total: filtered.length, page: query.page, pageSize: query.pageSize };
  }

  async updateInventoryStatus(orderId: string, status: string) {
    await new Promise((r) => setTimeout(r, 300));
    console.log("update inventory order status", orderId, status);
    return { success: true };
  }
}

const orderServices = new OrderServices();
export default orderServices;