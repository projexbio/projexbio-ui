"use client";

import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/routing/ProtectedRoute";

export default function HomePage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
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

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Welcome, {user?.name || "User"}!
            </h2>
            <p className="text-gray-600">Your email: {user?.email}</p>

            {/* Dashboard content will go here */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="font-medium mb-2">My Projects</h3>
                <p className="text-gray-500">
                  You don&apos;t have any projects yet.
                </p>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="font-medium mb-2">Recent Activity</h3>
                <p className="text-gray-500">No recent activity to display.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
