"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/components/ui/Loading";
// TODO: remove this loading from everywhere and use loader from HeroUI

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { appwriteUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && appwriteUser && !appwriteUser.emailVerification) {
      router.push("/signup/verify");
    } else if (!loading && !appwriteUser) {
      router.push("/login");
    }
  }, [appwriteUser, loading, router]);

  if (loading) {
    return <Loading />;
  }

  if (!appwriteUser) {
    return null;
  }

  return <>{children}</>;
}
