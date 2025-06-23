"use client";

import NavBar from "@/components/layout/NavBar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        {children}
        {children}
        {children}
        {children}
        {children}
        {children}
        {children}
        {children}
        {children}
        {children}
        {children}
        {children}
        {children}
        {children}
        {children}
      </main>
    </div>
  );
}
