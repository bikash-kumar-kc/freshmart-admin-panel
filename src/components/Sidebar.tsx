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
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "./components/ui/avatar";

export const resueableButtonCss =
  "hover:bg-[#262626] hover:text-button-secondary-text rounded-0! w-full py-5 text-[16px] tracking-wider rounded-0! data-[active=true]:bg-button-secondary-bg data-[active=true]:text-button-secondary-text active:bg-transparent active:scale-100 active:text-button-secondary-text px-2 py-5 rounded-sm";

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
    <Sidebar collapsible="icon" className="border-app-border ">
      <SidebarHeader className="bg-app-background text-app-foreground">
        <div className="flex items-center gap-2 py-2">
          <div className="w-5 h-5 rounded-sm bg-brand-primary flex items-center justify-center text-white shrink-0">
            <Leaf size={16} />
          </div>
          <span className="font-semibold text-app-foreground tracking-wider text-sm group-data-[collapsible=icon]:hidden ">
            FRESHMART
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-app-background text-app-foreground">
        <SidebarMenu className="flex flex-col gap-2">
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
                    className={`${resueableButtonCss}`}
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
                  className={`${resueableButtonCss}`}
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
                          className={`${resueableButtonCss}`}
                        >
                          <Link href={child.path}>
                            <span className="text-button-secondary-text">
                              {child.label}
                            </span>
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

      <SidebarFooter className="bg-app-background text-app-foreground">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2.5 w-full  py-2 rounded-sm hover:bg-sidebar-bg-hover transition-colors">
              <div className="w-8 h-8 rounded-full bg-brand-primary-soft text-brand-primary flex items-center justify-center text-xs font-semibold shrink-0">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>
                    {user?.email?.[0]?.toUpperCase() ?? "A"}
                  </AvatarFallback>
                  <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                </Avatar>
              </div>
              <span className="text-[15px] font-medium text-app-foreground truncate group-data-[collapsible=icon]:hidden">
                {user?.email ?? "Admin"}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            align="start"
            className="w-56 bg-app-background border-app-border flex flex-col gap-2"
          >
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>
                  {user?.email?.[0]?.toUpperCase() ?? "A"}
                </AvatarFallback>
                <AvatarBadge className="bg-green-600 dark:bg-green-800" />
              </Avatar>
              <div className="px-2 py-1.5">
                <p className="text-[15px] font-medium text-app-foreground truncate">
                  {user?.email}
                </p>
                <p className="text-[11px] text-app-muted-foreground">Admin</p>
              </div>
            </div>

            <DropdownMenuItem
              onClick={handleLogout}
              className="group px-2 py-2 bg-button-destructive-bg  text-button-destructive-text rounded-sm active:bg-transparent active:scale-100  focus:bg-button-destructive-bg-hover focus:text-button-destructive-text "
            >
              <LogOut size={14} className="mr-2 focus:text-button-destructive-text "/>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
