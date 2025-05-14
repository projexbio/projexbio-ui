"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/ui/Loading";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user && !user.emailVerification) {
      router.push("/signup/verify");
    } else if (!isLoading && user) {
      router.push("/explore");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <Loading />;
  }

  return !user ? <>{children}</> : null;
}