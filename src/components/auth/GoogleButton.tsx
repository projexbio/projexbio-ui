"use client";

import { useRouter } from "next/navigation";
import { googleOAuth } from "@/lib/appwrite/auth";
import { FcGoogle } from "react-icons/fc";
import { refreshAuthData } from "@/lib/query/useRefreshAuth";

interface GoogleButtonProps {
  text?: string;
}

export default function GoogleButton({ text }: GoogleButtonProps) {
  const router = useRouter();

  const handleGoogleAuth = async () => {
    try {
      await googleOAuth();
      // After OAuth redirect, refresh user data
      setTimeout(async () => {
        await refreshAuthData();
        router.push("/explore");
      }, 1000); // Give some time for the OAuth session to be registered
    } catch (error) {
      console.error("Google authentication failed:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleAuth}
      className="w-full flex items-center justify-center gap-x-3 py-2.5 mt-5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100"
    >
      <FcGoogle size={22} />
      {text}
    </button>
  );
}
