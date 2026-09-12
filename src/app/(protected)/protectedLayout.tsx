import TopStrip from "@/components/components/Tooltip";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/components/ui/sidebar";
import { TooltipProvider } from "@/components/components/ui/tooltip";
import AppSidebar from "@/components/Sidebar";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  // TODO: wire to real unread-count query once notifications resource is built for admin
  const unreadCount = 3; // demo value for now

  return (
    <SidebarProvider>
      <TooltipProvider>
        <AppSidebar />
        <SidebarInset>
          <TopStrip unreadCount={unreadCount} />

          <main className=" min-h-screen  w-full px-4 sm:px-6 lg:px-8 py-6 transition-all duration-200 bg-app-background! text-app-muted-foreground!">
            {children}
          </main>
        </SidebarInset>
      </TooltipProvider>
    </SidebarProvider>
  );
}
