import { Bell } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";
import { useRouter } from "next/navigation";


export default function TopStrip({ unreadCount = 0 }: { unreadCount?: number }) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-app-border">
      <SidebarTrigger />

      <button
        onClick={() => router.push("/notifications")}
        className="relative p-2 rounded-sm hover:bg-sidebar-bg-hover transition-colors"
      >
        <Bell size={18} className="text-app-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-brand-cta text-white text-[10px] font-semibold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>
    </div>
  );
}