"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// TODO: remove this loading from everywhere and use loader from HeroUI
// TODO: remove this loading from everywhere and use loader from HeroUI
import Loading from "@/components/ui/Loading";

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

  // TODO: add a ghsvfyuev testing workflow
  // Issue URL: https://github.com/projexbio/projexbio-ui/issues/6
  if (!appwriteUser) {
    return null;
  }

  return <>{children}</>;
}
