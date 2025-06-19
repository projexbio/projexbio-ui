"use client";

import React, { useState } from "react";
import RoleSelection from "@/components/onboarding/RoleSelection";
import PersonalInfo from "@/components/onboarding/PersonalInfo";
import CollegeInfo from "@/components/onboarding/CollegeInfo";
import { useOnboardingStore } from "@/store/onboardingStore";
import { Button, Spinner, Alert } from "@heroui/react";
import { UserService } from "@/lib/api/users";
import { useAuth } from "@/contexts/AuthContext";
import { OnboardingPayloadSchema } from "@/types/user";
import { handleApiError } from "@/lib/utils/errorHandler";

const OnboardingWrapper: React.FC = () => {
  const { resetStore, onboardingData } = useOnboardingStore();
  const { appwriteUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleReset = () => {
    resetStore();
    setSuccess(false);
    setError("");
  };

  const handleSubmit = async () => {
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const payload = {
        ...onboardingData,
        appwriteId: appwriteUser?.$id,
      };

      // Remove avatarFile from payload since it will be sent separately
      const { avatarFile, ...payloadWithoutAvatar } = payload;

      const validatedPayload =
        OnboardingPayloadSchema.parse(payloadWithoutAvatar);

      await UserService.onboardUser(validatedPayload, avatarFile);
      setSuccess(true);
    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-10 pb-10">
      <RoleSelection />
      <PersonalInfo />
      <CollegeInfo />
      <div className="flex flex-col gap-4 p-4">
        {error && <Alert color="danger" description={error} />}
        <div className="flex gap-4 justify-center">
          <Button onPress={handleReset} variant="bordered" color="primary">
            Reset
          </Button>
          <Button onPress={handleSubmit} color="primary" isDisabled={loading}>
            {loading ? <Spinner size="sm" color="current" /> : "Submit"}
          </Button>
        </div>
        {success && (
          <Alert color="success" description="Submitted successfully!" />
        )}
      </div>
    </div>
  );
};

export default OnboardingWrapper;
