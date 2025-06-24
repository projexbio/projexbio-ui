"use client";

import NavBar from "@/components/layout/NavBar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar />
      <main>
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
