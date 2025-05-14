"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/components/ui/Loading";
import {Input, Avatar } from "antd";
import { Button } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user && !user.emailVerification) {
      router.push("/signup/verify");
    } else if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <nav
        className="px-4 py-2 bg-gradient-to-r from-brand-purple to-brand-blue"
      >
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
            {/* <Button
              className="bg-brand-purple"
              type="primary"
              href="/registration"
              style={{  borderColor: "var(--color-brand-purple)" }}
              size="large"
            >
              Upload Project
            </Button> */}
            <Button className="bg-brand-purple">Click me</Button>
            <a
              href={`/profile/${user?.name ? encodeURIComponent(user.name) : user?.$id}`}
              title="Profile"
            >
              <Avatar style={{ backgroundColor: '#fff', color: 'var(--color-brand-purple)', fontWeight: 700 }} size={40}>
                {user?.name ? user.name.charAt(0).toUpperCase() : <span className="material-icons">person</span>}
              </Avatar>
            </a>
          </div>
        </div> 
      </nav>
      <main>{children}</main>
    </div>
  );
} 