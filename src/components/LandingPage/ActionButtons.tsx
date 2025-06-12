"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Spinner } from "@heroui/react";

export default function ActionButtons() {
  const { appwriteUser, loading: authLoading } = useAuth();
  const isLoggedIn = !!appwriteUser;

  return (
    <div className="flex gap-4">
      {authLoading ? (
        <Spinner variant="wave" />
      ) : (
        <>
          {isLoggedIn ? (
            <Link href="/dashboard">
              <button className="px-6 py-3 bg-brand-purple text-white rounded-full font-medium shadow-md hover:bg-purple-600">
                Go to Dashboard
              </button>
            </Link>
          ) : (
            <Link href="/institute/register">
              <button className="px-6 py-3 bg-brand-purple text-white rounded-full font-medium shadow-md hover:bg-purple-600">
                Register your Institute
              </button>
            </Link>
          )}
          <Link href="/contribute">
            <button className="px-6 py-3 border border-gray-400 text-white rounded-full hover:bg-white hover:text-black transition">
              Contribute
            </button>
          </Link>
        </>
      )}
    </div>
  );
}