"use client";

import MainNav from "@/components/layout/MainNav";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
