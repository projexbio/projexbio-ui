"use client";

import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { logout } = useAuth();

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
            ProjexBio Dashboard
          </h1>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            Logout
          </button>
        </div>
        {/* Rest of your component */}
      </div>
    </main>
  );
} 