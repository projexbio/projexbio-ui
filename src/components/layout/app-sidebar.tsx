"use client";

import { LuPanelLeftOpen, LuPanelLeftClose } from "react-icons/lu";
import { MdTravelExplore, MdLogout } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import {
  FaSchool,
  FaGithub,
  FaProjectDiagram,
  FaFile,
  FaBookmark,
  FaUsers,
  FaPlus,
  FaCog,
} from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { useLogout } from "@/lib/query/useAppwriteUser";
import Link from "next/link";

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
const applicationItems = [
  {
    title: "Home",
    url: "/home",
    icon: FiHome,
  },
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
  // TODO: College in sidebar should be dynamic
  // which will be fetched from the user's college, it can be more than one college
  // and user can select which college to show from dropdown
  {
    title: "Scaler School of Technology",
    url: "/scaler-school-of-technology",
    icon: FaSchool,
  },
];

const userItems = [
  {
    title: "My Projects",
    url: "#",
    icon: FaProjectDiagram,
  },
  {
    title: "Submissions",
    url: "#",
    icon: FaFile,
  },
  {
    title: "Bookmarks",
    url: "#",
    icon: FaBookmark,
  },
  {
    title: "Collaboration Board",
    url: "#",
    icon: FaUsers,
  },
];

const facultyTools = [
  {
    title: "Create Assignment",
    url: "/#",
    icon: FaPlus,
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
      title: "Settings",
      icon: FaCog,
      type: "link",
      url: "/settings",
      tooltip: "Settings",
    },
    {
      title: "Contribute on Github",
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
      className="fixed top-[54px] h-[calc(100vh-56px)]"
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
              {applicationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>User</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Faculty Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {facultyTools.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
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
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
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
