"use client";
import { useState } from "react";
import { Leaf, ChevronDown, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { navItems } from "@/lib/constants/navigation/navigation";
import { useAuthContext } from "@/providers/AuthContextProvider";
import { useLogoutMutation } from "@/lib/hooks/useLogout";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./components/ui/sidebar";
import Link from "next/link";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenu,
} from "./components/ui/dropdown-menu";

export default function AppSidebar() {
  const location = usePathname();
  const router = useRouter();
  const { user } = useAuthContext();
  const logoutMutation = useLogoutMutation();

  const [openSubmenu, setOpenSubmenu] = useState<string | null>(
    navItems.find((item) =>
      item.children?.some((c) => location.startsWith(c.path)),
    )?.label ?? null,
  );

  async function handleLogout() {
    await logoutMutation.mutateAsync();
    router.push("/login");
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="w-8 h-8 rounded-sm bg-brand-primary flex items-center justify-center text-white shrink-0">
            <Leaf size={16} />
          </div>
          <span className="font-semibold text-app-foreground tracking-tight text-sm group-data-[collapsible=icon]:hidden">
            FRESHMART
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => {
            const Icon = item.icon;
            const hasChildren = !!item.children?.length;
            const isParentActive = hasChildren
              ? item.children!.some((c) => location.startsWith(c.path))
              : location === item.path;

            if (!hasChildren) {
              return (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={isParentActive}
                    tooltip={item.label}
                  >
                    <Link href={item.path}>
                      <Icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            }

            const isOpen = openSubmenu === item.label;

            return (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  isActive={isParentActive}
                  tooltip={item.label}
                  onClick={() => setOpenSubmenu(isOpen ? null : item.label)}
                >
                  <Icon />
                  <span>{item.label}</span>
                  <ChevronDown
                    className={`ml-auto transition-transform ${isOpen ? "rotate-180" : ""}`}
                    size={14}
                  />
                </SidebarMenuButton>

                {isOpen && (
                  <SidebarMenuSub>
                    {item.children!.map((child) => (
                      <SidebarMenuSubItem key={child.path}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={location === child.path}
                        >
                          <Link href={child.path}>
                            <span>{child.label}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2.5 w-full px-2 py-2 rounded-sm hover:bg-sidebar-bg-hover transition-colors">
              <div className="w-8 h-8 rounded-full bg-brand-primary-soft text-brand-primary flex items-center justify-center text-xs font-semibold shrink-0">
                {user?.email?.[0]?.toUpperCase() ?? "A"}
              </div>
              <span className="text-xs font-medium text-app-foreground truncate group-data-[collapsible=icon]:hidden">
                {user?.email ?? "Admin"}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-xs font-medium text-app-foreground truncate">
                {user?.email}
              </p>
              <p className="text-[11px] text-app-muted-foreground">Admin</p>
            </div>
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-500 focus:text-red-500"
            >
              <LogOut size={14} className="mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
