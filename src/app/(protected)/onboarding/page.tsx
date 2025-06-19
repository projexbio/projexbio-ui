"use client";

import OnboardingWrapper from "@/components/onboarding/OnboardingWrapper";
import { Spinner } from "@heroui/react";
import { useAuth } from "@/contexts/AuthContext";
import { Link as LinkButton } from "@heroui/react";
import { IoIosLogOut } from "react-icons/io";

export default function OnboardingPage() {
  const { logout, isLoggingOut } = useAuth();

  return (
    <div className="text-center relative">
      <div className="text-center py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Welcome to ProjexBio
        </h1>
        <p className="text-gray-600">
          Please complete the onboarding process to get started
        </p>
      </div>

      <OnboardingWrapper />

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
  );
}
