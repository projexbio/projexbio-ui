"use client";

import Image from "next/image";
import Link from "next/link";
import { Input, Avatar } from "antd";
import { Link as LinkButton, Button, Tooltip } from "@heroui/react";
import { FaCirclePlus } from "react-icons/fa6";
import { useAuth } from "@/contexts/AuthContext";
import { IoIosLogOut } from "react-icons/io";

export default function MainNav() {
  const { user, logout } = useAuth();

  return (
    <nav className="px-4 py-2 bg-gradient-to-r from-brand-purple to-brand-blue">
      <div className="grid grid-cols-3 items-center w-full mx-auto">
        {/* Left: Logo */}
        <div className="flex items-center gap-2 justify-start">
          <Link href="/explore">
            <Image
              src="/assets/logo/logo-title-black.svg"
              alt="ProjexBio Logo"
              height={300}
              width={135}
              priority
            />
          </Link>
        </div>

        {/* Center: Search Bar */}
        <div className="flex justify-center">
          <Input.Search
            placeholder="Search directory..."
            allowClear
            className="w-full max-w-md"
            size="large"
            style={{ borderRadius: 8 }}
          />
        </div>

        {/* Right: Upload Project & Profile */}
        <div className="flex items-center gap-4 justify-end">
          {/* Upload Project Button */}
          <Button
            className="bg-brand-purple rounded-full pl-1"
            startContent={<FaCirclePlus size={42} />}
          >
            Upload Project
          </Button>
          {/* Profile Button */}
          <Tooltip content="Profile" placement="bottom">
            <a href={`/profile/${user?.username || "me"}`}>
              <Avatar
                style={{
                  backgroundColor: "#fff",
                  color: "var(--color-brand-purple)",
                  fontWeight: 700,
                }}
                size={40}
              >
                {user?.name ? (
                  user.name.charAt(0).toUpperCase()
                ) : (
                  <span className="material-icons">person</span>
                )}
              </Avatar>
            </a>
          </Tooltip>
          {/* Logout Button */}
          <Tooltip content="Logout" placement="bottom" offset={15}>
            <LinkButton
              onPress={logout}
              className="text-white hover:text-gray-200 cursor-pointer"
            >
              <IoIosLogOut size={24} />
            </LinkButton>
          </Tooltip>
        </div>
      </div>
    </nav>
  );
}
