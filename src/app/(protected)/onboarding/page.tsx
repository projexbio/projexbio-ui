"use client";

import OnboardingWrapper from "@/components/onboarding/OnboardingWrapper";
import { Spinner } from "@heroui/react";
import { useAuth } from "@/contexts/AuthContext";
import { Link as LinkButton } from "@heroui/react";
import { IoIosLogOut } from "react-icons/io";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const { logout, isLoggingOut } = useAuth();
  const router = useRouter();

  const [showWelcome, setShowWelcome] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [showText, setShowText] = useState(false);
  const [name, setName] = useState("");

  const handleSetShowWelcome = (name: string) => {
    setShowWelcome(true);
    setName(name);
    // Start background animation after a small delay
    setTimeout(() => {
      setShowBackground(true);
    }, 100);

    // Start text fade-out after background animation completes (2s) + wait (1s) = 3s
    setTimeout(() => {
      setShowText(true);
    }, 3000);

    // Redirect after text fade-out completes (2s) = 5s total
    setTimeout(() => {
      router.push("/explore");
    }, 5000);
  };

  return (
    <>
      <div className="text-center relative">
        <div className="text-center py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Welcome to ProjexBio
          </h1>
          <p className="text-gray-600">
            Please complete the onboarding process to get started
          </p>
        </div>

        <OnboardingWrapper onComplete={handleSetShowWelcome} />

        <div className="absolute top-4 right-4 z-10">
          <LinkButton
            onPress={logout}
            className="hover:text-red-300 cursor-pointer flex items-center"
            color="danger"
            isDisabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <>
                Logging out
                <Spinner size="sm" color="danger" className="ml-2" />
              </>
            ) : (
              <>
                Logout
                <IoIosLogOut size={24} className="ml-1" />
              </>
            )}
          </LinkButton>
        </div>
      </div>
      {showWelcome && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Animated background overlay */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-[2000ms] ease-in-out ${
              showBackground ? "opacity-100" : "opacity-0"
            } backdrop-blur-sm`}
          ></div>

          {/* Welcome message with fade-out animation */}
          <div
            className={`relative text-center transition-opacity duration-[2000ms] ease-in-out ${
              showText ? "opacity-0" : "opacity-100"
            }`}
          >
            <h1 className="text-4xl font-bold text-white">Welcome {name}!</h1>
          </div>
        </div>
      )}
    </>
  );
}
