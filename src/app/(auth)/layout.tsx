"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/ui/Loading";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { appwriteUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && appwriteUser && !appwriteUser.emailVerification) {
      router.push("/signup/verify");
    } else if (!loading && appwriteUser) {
      router.push("/explore");
    }
  }, [appwriteUser, loading, router]);

  if (loading) {
    return <Loading />;
  }

  return !appwriteUser ? <>{children}</> : null;
}
