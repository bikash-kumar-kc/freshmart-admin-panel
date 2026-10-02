import { notificationDemoData } from "@/lib/constants/notification/notificationDemoData";
import type {
  INotificationQuery,
  INotificationResponse,
} from "@/types/notification/notification.types";

class NotificationServices {
  async list(query: INotificationQuery): Promise<INotificationResponse> {
    await new Promise((r) => setTimeout(r, 250));

    let filtered = [...notificationDemoData];

    if (query.pill === "read") filtered = filtered.filter((n) => n.isRead);
    else if (query.pill === "unread")
      filtered = filtered.filter((n) => !n.isRead);
    else if (query.pill !== "all")
      filtered = filtered.filter((n) => n.subType === query.pill);

    filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    const start = (query.page - 1) * query.pageSize;
    return {
      data: filtered.slice(start, start + query.pageSize),
      total: filtered.length,
      page: query.page,
      pageSize: query.pageSize,
    };
  }

  async getUnreadCount(): Promise<{ unreadCount: number }> {
    await new Promise((r) => setTimeout(r, 150));
    const unreadCount = notificationDemoData.filter((n) => !n.isRead).length;
    return { unreadCount };
  }
}

const notificationServices = new NotificationServices();
export default notificationServices;
