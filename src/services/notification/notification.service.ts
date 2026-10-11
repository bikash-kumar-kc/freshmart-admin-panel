// services/notification/notification.service.ts
import { api as client} from "@/client/axios/client";
import type {
  INotificationQuery,
  INotificationResponse,
} from "@/types/notification/notification.types";

class NotificationServices {
  async list(query: INotificationQuery): Promise<INotificationResponse> {
    const { data } = await client.get("/admin/notifications", {
      params: query,
    });
    return data;
  }

  async getUnreadCount(): Promise<{ unreadCount: number }> {
    const { data } = await client.get("/admin/notifications/unread-count");
    return data;
  }

  async setRead(id: string, isRead: boolean) {
    const { data } = await client.patch(`/admin/notifications/${id}/read`, {
      isRead,
    });
    return data;
  }
}

const notificationServices = new NotificationServices();
export default notificationServices;
