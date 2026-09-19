import { LayoutDashboard, Package, Users, Bell, type LucideIcon } from "lucide-react";

export interface INavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  children?: INavItem[];
}

export const navItems: INavItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    path: "/products",
    icon: Package,
    children: [
      { label: "Product Live", path: "/products/live", icon: Package },
      { label: "Product Listing", path: "/products/productListing", icon: Package },
    ],
  },
  {
    label: "Vendors",
    path: "/vendors",
    icon: Users,
  },
  {
    label: "Notifications",
    path: "/notifications",
    icon: Bell,
  },
];