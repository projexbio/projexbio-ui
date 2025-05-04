"use client";

import PublicRoute from "@/components/routing/PublicRoute";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <PublicRoute>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
            Log In to ProjexBio
          </h1>
          <LoginForm />
        </div>
      </div>
    </PublicRoute>
  );
}
