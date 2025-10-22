import { Home, MessageCircleIcon, UserIcon } from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Xabarlar",
    url: "/dashboard/messages",
    icon: MessageCircleIcon,
  },
  {
    title: "Adminlar",
    url: "/dashboard/admins",
    icon: UserIcon,
  },
];
