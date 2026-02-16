import type { JSX } from "react";
import type { User } from "./users.types";

export interface NavLink {
  label: string;
  path: string;
  icon: JSX.Element;
}

export interface NavSection {
  title: string;
  links: NavLink[];
}

export interface DashboardLayoutProps {
  children: React.ReactNode;
  user?: User;
}

export interface NavbarProps {
  user?: User;
}

export interface SidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
}
