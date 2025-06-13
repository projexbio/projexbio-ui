"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Spinner } from "@heroui/react";
import { FaGithub } from "react-icons/fa";
import "@/app/styles/pearl-button.css";

export default function ActionButtons() {
  const { appwriteUser, loading: authLoading } = useAuth();
  const isLoggedIn = !!appwriteUser;

  return (
    <div className="flex gap-8 items-center">
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
            <Link href="/signup">
              <button className="pearl-button">
                <div className="wrap">
                  <p>Register your Institute</p>
                </div>
              </button>
            </Link>
          )}
          <Link href="https://github.com/projexbio">
            <button className="px-6 py-3 border border-gray-400 text-white rounded-large hover:bg-white hover:text-black transition flex items-center">
              <FaGithub className="h-7 w-7 text-brand-purple" />
              <span className="ml-2">Contribute</span>
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
