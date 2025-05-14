"use client";

import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { logout } = useAuth();

  return (
    <main className="min-h-screen">
      <h1>Explore</h1>
    </main>
  );
} 