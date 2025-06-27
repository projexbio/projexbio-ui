"use client";

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
import { MdLiveHelp } from "react-icons/md";
import { MdLightMode, MdDarkMode, MdLogout } from "react-icons/md";
import { GrSystem } from "react-icons/gr";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/lib/query/useCurrentUser";
import { useLogout } from "@/lib/query/useAppwriteUser";

// TODO: make this whole navbar responsive
// Use menu feature from HeroUI, ensures everything is responsive except brand component
export default function NavBar() {
  const router = useRouter();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useCurrentUser();
  const { theme, setTheme, resolvedTheme } = useTheme();

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
    // make bg slight transparent
    <Navbar
      isBordered
      className="mx-auto p-0 h-14 bg-sidebar/70 backdrop-blur-lg"
      maxWidth="full"
    >
      {/* Brand */}
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Image
            src={
              resolvedTheme === "dark"
                ? "/assets/logo/white-without-bg.png"
                : "/assets/logo/black-without-bg.png"
            }
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
      {/* TODO: Add a search bar functionality in future with proper app search */}
      <NavbarContent justify="center">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[500px] md:w-md h-9",
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
        <NavbarItem className="h-8">
          <Button
            className="rounded-full pl-1"
            color="primary"
            size="sm"
            startContent={<FaCirclePlus size={25} />}
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
                name={
                  userLoading ? "" : user?.firstName?.charAt(0).toUpperCase()
                }
                size="sm"
                src={user?.avatarUrl}
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              disabledKeys={[
                ...(userLoading || !user?.username ? ["profile"] : []),
                ...(isLoggingOut ? ["logout"] : []),
              ]}
            >
              <DropdownItem
                key="profile"
                textValue="Profile"
                startContent={<FaUser size={16} />}
                onPress={() => router.push(`/${user?.username}`)}
              >
                <p className="font-semibold">
                  {userLoading
                    ? "Loading..."
                    : userError
                      ? "Profile unavailable"
                      : "View Profile"}
                </p>
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
              {/* TODO: Add a link to the help and feedback page*/}
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
                onPress={() => logout()}
                textValue="Log Out"
              >
                {isLoggingOut ? "Logging out..." : "Log Out"}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
