"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const isLoggedIn = !!user; // Check if user is logged in

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24">
      <div className="w-full max-w-5xl space-y-10 text-center">
        <h1 className="py-1 text-4xl md:text-6xl font-bold bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
          Welcome to ProjexBio
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Empowering Projects Across Campuses
        </p>

        {isLoggedIn ? (
          <Link
            href="/home"
            className="space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-brand-purple to-brand-blue rounded-lg shadow hover:shadow-lg transition duration-300"
          >
            Go to Home Page
          </Link>
        ) : (
          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Link href="/login">
              <button className="w-full md:w-auto px-6 py-3 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg">
                Log In
              </button>
            </Link>
            <Link href="/signup">
              <button className="w-full md:w-auto px-6 py-3 text-indigo-600 font-medium border border-indigo-600 hover:bg-indigo-50 rounded-lg">
                Sign Up
              </button>
            </Link>
          </div>
        )}

        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-6">About ProjexBio</h2>
          <p className="text-gray-600">
            ProjexBio is a platform designed to connect students, researchers,
            and faculty across campuses to collaborate on projects in the field
            of Computer Science and related disciplines. Join our community to
            discover innovative projects, find collaborators, and showcase your
            work.
          </p>
        </div>
      </div>
    </main>
  );
}
