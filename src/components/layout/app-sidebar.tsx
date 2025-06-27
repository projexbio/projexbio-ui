"use client";

import { Settings } from "lucide-react";
import { LuPanelLeftOpen, LuPanelLeftClose } from "react-icons/lu";
import { MdTravelExplore, MdLogout } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaSchool, FaGithub } from "react-icons/fa";
import { useLogout } from "@/lib/query/useAppwriteUser";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Explore",
    url: "/explore",
    icon: MdTravelExplore,
  },
  {
    title: "Categories",
    url: "/categories",
    icon: BiSolidCategoryAlt,
  },
  {
    title: "Scaler School of Technology",
    url: "/scaler-school-of-technology",
    icon: FaSchool,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

type FooterItem =
  | {
      title: string;
      icon: React.ComponentType;
      className?: string;
      type: "action";
      onClick: () => void;
      tooltip?: string;
    }
  | {
      title: string;
      icon: React.ComponentType;
      className?: string;
      type: "link";
      url: string;
      tooltip?: string;
    };

export function AppSidebar() {
  const { toggleSidebar, state } = useSidebar();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const footerItems: FooterItem[] = [
    {
      title: "Github",
      icon: FaGithub,
      type: "link",
      url: "https://github.com/projexbio",
      tooltip: "Contribute to the ProxBio",
    },
    {
      title: "Logout",
      icon: MdLogout,
      className: "text-danger hover:bg-danger-100",
      onClick: () => {
        logout();
      },
      type: "action", // For actions like logout
    },
  ];

  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      className="fixed top-14 h-[calc(100vh-56px)]"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={toggleSidebar}
              tooltip="Toggle Sidebar"
              className="bg-default-200"
            >
              {state === "expanded" ? (
                <LuPanelLeftClose className="text-lg font-bold" />
              ) : (
                <LuPanelLeftOpen />
              )}
              <span className="text-md font-semibold">Menu</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.type === "link" ? (
                <SidebarMenuButton
                  asChild
                  tooltip={item.tooltip ?? item.title}
                  className={item.className}
                >
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              ) : (
                <SidebarMenuButton
                  onClick={item.onClick}
                  tooltip={item.title}
                  className={`${item.className} cursor-pointer`}
                >
                  <item.icon />
                  <span>
                    {item.title === "Logout" && isLoggingOut
                      ? "Logging out..."
                      : item.title}
                  </span>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
