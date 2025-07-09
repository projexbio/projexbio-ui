"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import axios from "axios";
import Loading from "@/components/ui/Loading";
import { useAppwriteUser } from "@/lib/query/useAppwriteUser";
import { useCurrentUser } from "@/lib/query/useCurrentUser";
import { ThemeProvider } from "next-themes";
// TODO: remove this loading from everywhere and use loader from HeroUI

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: appwriteUser, isLoading: appwriteLoading } = useAppwriteUser();
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useCurrentUser();
  const router = useRouter();
  const pathname = usePathname();
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Reset redirect tracking on pathname change
    hasRedirected.current = false;
  }, [pathname]);

  useEffect(() => {
    // If already redirected in this cycle, prevent multiple redirects
    if (hasRedirected.current) return;

    // If still loading, don't redirect
    if (appwriteLoading) return;

    // If no appwrite user, redirect to login
    if (!appwriteUser) {
      hasRedirected.current = true;
      router.push("/login");
      return;
    }

    // If appwrite user not verified, redirect to verification
    if (!appwriteUser.emailVerification) {
      hasRedirected.current = true;
      router.push("/signup/verify");
      return;
    }

    // If user data is still loading, wait
    if (userLoading) return;

    // If backend user not found (404), redirect to onboarding
    if (
      userError &&
      axios.isAxiosError(userError) &&
      userError.response?.status === 404 &&
      userError.response?.data?.message === "User not found" &&
      pathname !== "/onboarding"
    ) {
      hasRedirected.current = true;
      router.push("/onboarding");
      return;
    }
  }, [
    appwriteUser,
    appwriteLoading,
    user,
    userLoading,
    userError,
    router,
    pathname,
  ]);

  // Show loading if either is loading
  if (appwriteLoading || userLoading) {
    return <Loading />;
  }

  // If no appwrite user, don't render (will redirect)
  if (!appwriteUser) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="h-full">{children}</div>
    </ThemeProvider>
  );
}
