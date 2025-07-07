"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Loading from "@/components/ui/Loading";
import { useAppwriteUser } from "@/lib/query/useAppwriteUser";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: appwriteUser, isLoading: loading } = useAppwriteUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't redirect if we're already on the verification page
    if (pathname === "/signup/verify") {
      return;
    }

    if (!loading && appwriteUser && !appwriteUser.emailVerification) {
      // Only redirect to verify page if not already there
      router.push("/signup/verify");
    } else if (!loading && appwriteUser && appwriteUser.emailVerification) {
      // If user is verified, redirect to explore
      router.push("/explore");
    }
  }, [appwriteUser, loading, router, pathname]);

  if (loading) {
    return <Loading />;
  }

  // Allow verification page to render even if user is logged in
  if (pathname === "/signup/verify") {
    return <>{children}</>;
  }

  // For other auth pages, only render if user is not logged in
  return !appwriteUser ? <>{children}</> : null;
}
