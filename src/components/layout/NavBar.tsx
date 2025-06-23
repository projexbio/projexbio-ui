import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
  Tooltip,
} from "@heroui/react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { FaCirclePlus, FaUser } from "react-icons/fa6";
import { useAuth } from "@/contexts/AuthContext";
import { FcSettings } from "react-icons/fc";
import { MdLiveHelp } from "react-icons/md";
import { MdLightMode, MdDarkMode, MdLogout } from "react-icons/md";
import { GrSystem } from "react-icons/gr";
import { useTheme } from "next-themes";

export default function App() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const themes = [
    {
      mode: "light",
      icon: <MdLightMode size={16} />,
    },
    {
      mode: "dark",
      icon: <MdDarkMode size={16} />,
    },
    {
      mode: "system",
      icon: <GrSystem size={16} />,
    },
  ];

  return (
    <Navbar isBordered className="mx-auto p-0" maxWidth="full">
      {/* Brand */}
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Image
            src="/android-chrome-512x512.png"
            alt="ProjexBio Logo"
            height={36}
            width={36}
          />
          <p className="hidden sm:block ml-1 font-bold text-inherit">
            ProjexBio
          </p>
        </NavbarBrand>
      </NavbarContent>

      {/* Search */}
      {/* TODO: Add a search bar functionality */}
      <NavbarContent justify="center">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[500px] md:w-md lg:w-lg h-10",
            mainWrapper: "h-full",
            inputWrapper: "h-full font-normal text-default-500",
            input: "text-secondary",
          }}
          placeholder="Type to search..."
          size="sm"
          variant="bordered"
          endContent={<FaSearch size={16} />}
          type="search"
        />
      </NavbarContent>

      {/* Upload Project & User Profile related dropdown */}
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            className="rounded-full pl-1"
            color="primary"
            startContent={<FaCirclePlus size={42} />}
          >
            Upload Project
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger className="cursor-pointer">
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="profile"
                textValue="Profile"
                startContent={<FaUser size={16} />}
                href={`/profile/${user?.username}`}
              >
                <p className="font-semibold">Go to your Profile</p>
              </DropdownItem>
              {/* TODO: Add a link to the settings page */}
              <DropdownItem
                startContent={<FcSettings size={16} />}
                key="settings"
                textValue="Settings"
              >
                Settings
              </DropdownItem>
              <DropdownItem
                className="pl-0"
                key="theme"
                textValue="Theme selection"
                startContent={
                  <div className="gap-0">
                    {themes.map((item) => (
                      <Tooltip content={item.mode} key={item.mode} size="sm">
                        <Button
                          variant="light"
                          endContent={item.icon}
                          isIconOnly
                          onPress={() => setTheme(item.mode)}
                          size="sm"
                          radius="none"
                          className={`h-6 ${
                            theme && item.mode === theme
                              ? "bg-primary"
                              : "bg-default"
                          }
                           ${item.mode === "light" ? " rounded-l-full" : item.mode === "system" ? "rounded-r-full" : ""} `}
                        />
                      </Tooltip>
                    ))}
                  </div>
                }
              >
                Theme
              </DropdownItem>
              {/* TODO: Add a link to the help and feedback page */}
              <DropdownItem
                startContent={<MdLiveHelp size={16} />}
                key="help_and_feedback"
                textValue="Help & Feedback"
              >
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                startContent={<MdLogout size={16} />}
                key="logout"
                color="danger"
                onPress={logout}
                textValue="Log Out"
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
