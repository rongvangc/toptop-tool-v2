import { Role } from "@/lib/enum";
import { BotMessageSquare, Home, LucideIcon } from "lucide-react";

export interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    url: string;
    roles?: Role[];
  }[];
  userRole?: Role;
  onCollapse: () => void;
}

export const dashboardNavigation: NavProps["links"] = [
  {
    title: "Dashboad",
    label: "",
    icon: Home,
    url: "/dashboard",
    roles: [],
  },
  {
    title: "Toptop",
    label: "",
    icon: BotMessageSquare,
    url: "/toptop",
    roles: [],
  },
];
