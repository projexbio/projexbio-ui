"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/components/ui/Loading";
import MainNav from "@/components/layout/MainNav";

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

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
