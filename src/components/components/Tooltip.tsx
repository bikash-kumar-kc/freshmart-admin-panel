"use client";
import { Bell } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";
import { useRouter } from "next/navigation";
import { useUnreadNotificationCountQuery } from "@/lib/hooks/notification/notification.queries";

export default function TopStrip() {
  const router = useRouter();
  const { data } = useUnreadNotificationCountQuery();

  const unreadCount = data?.unreadCount || 0;

  return (
    <div className="sticky top-0 z-50 flex h-12 w-full items-center justify-between border-b border-app-border bg-app-background px-4 text-app-foreground">
      <SidebarTrigger />

      <button
        onClick={() => router.push("/notifications")}
        className="relative rounded-sm p-2 transition-colors hover:bg-sidebar-bg-hover"
      >
        <Bell size={18} className="text-app-foreground" />

        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-cta px-1 text-[10px] font-semibold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>
    </div>
  );
}
