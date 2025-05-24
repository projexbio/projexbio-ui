"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button, Input } from "@heroui/react";

export default function OnboardingPage() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { appwriteUser } = useAuth();

  const checkUsernameAvailability = async (username: string) => {
    try {
      const response = await fetch(
        `/api/users/check-username?username=${username}`
      );
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const handleUsernameChange = async (value: string) => {
    setUsername(value);
    setError("");

    if (value.length > 3) {
      setIsChecking(true);
      const isAvailable = await checkUsernameAvailability(value);
      if (!isAvailable) {
        setError("Username is already taken");
      }
      setIsChecking(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appwriteUserId: appwriteUser?.$id,
          username,
          fullName,
        }),
      });

      if (response.ok) {
        // Redirect to profile page with username
        router.push(`/profile/${username}`);
      } else {
        setError("Failed to create profile. Please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome to ProjexBio!
          </h2>
          <p className="mt-2 text-gray-600">Let's set up your profile</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <Input
              label="Username"
              value={username}
              onChange={(e) => handleUsernameChange(e.target.value)}
              required
              placeholder="Choose a unique username"
              description="This will be your unique identifier on ProjexBio"
              errorMessage={error}
              isInvalid={!!error}
            />
            {isChecking && (
              <p className="text-sm text-gray-500 mt-1">
                Checking availability...
              </p>
            )}
          </div>

          <Button
            type="submit"
            isLoading={isSubmitting}
            isDisabled={!username || !fullName || !!error || isChecking}
            className="w-full bg-gradient-to-r from-brand-purple to-brand-blue text-white"
          >
            Complete Setup
          </Button>
        </form>
      </div>
    </div>
  );
}
