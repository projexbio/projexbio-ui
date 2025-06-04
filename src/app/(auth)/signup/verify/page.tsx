"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  confirmVerification,
  sendVerificationEmail,
} from "@/lib/appwrite/auth";
import { Alert, Spin } from "antd";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/ui/Loading";
import { Button } from "@heroui/react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [verificationStatus, setVerificationStatus] = useState<
    "loading" | "success" | "error" | "idle"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<{
    show: boolean;
    success: boolean;
    message: string;
  }>({ show: false, success: false, message: "" });
  const { appwriteUser, loading, refreshUser } = useAuth();
  const [verificationAttempted, setVerificationAttempted] = useState(false);
  const redirectingRef = useRef(false);

  const userId = searchParams?.get("userId");
  const secret = searchParams?.get("secret");

  useEffect(() => {
    // Don't do anything while still loading
    if (loading) {
      console.log("Still loading auth state...");
      return;
    }

    // If user is already verified, redirect to explore
    if (appwriteUser && appwriteUser.emailVerification) {
      console.log("User already verified, redirecting to explore");
      router.push("/explore");
      return;
    }

    // If we have verification parameters, attempt verification
    if (userId && secret && !verificationAttempted && !redirectingRef.current) {
      console.log("Starting verification process...");
      const verifyEmail = async () => {
        setVerificationStatus("loading");
        setVerificationAttempted(true);

        try {
          console.log("Calling confirmVerification...");
          await confirmVerification(userId, secret);
          console.log("Verification successful!");
          setVerificationStatus("success");

          // Refresh user data to get updated verification status
          await refreshUser();

          // Set the redirecting flag before starting redirect process
          redirectingRef.current = true;

          // Redirect after success message
          setTimeout(() => {
            router.push("/explore");
          }, 1000);
        } catch (error: unknown) {
          console.error("Verification failed:", error);
          setVerificationStatus("error");
          if (error instanceof Error) {
            setErrorMessage(
              error.message || "Failed to verify email. Please try again."
            );
          } else {
            setErrorMessage("An unknown error occurred. Please try again.");
          }
        }
      };

      verifyEmail();
    } else if (!userId || !secret) {
      // If no verification params and no user, show message for manual verification
      console.log("No verification parameters found");
      if (!appwriteUser) {
        // If not logged in and no verification params, this might be a manual visit
        // Don't redirect immediately, let user see the page
        console.log("User not logged in, showing manual verification option");
      }
    }
  }, [
    userId,
    secret,
    router,
    loading,
    appwriteUser,
    verificationAttempted,
    refreshUser,
  ]);

  const handleResendEmail = async () => {
    setIsResending(true);
    setResendStatus({ show: false, success: false, message: "" });

    try {
      await sendVerificationEmail("/signup/verify");
      setIsResending(false);
      setResendStatus({
        show: true,
        success: true,
        message: "Verification email sent! Please check your inbox.",
      });
    } catch (error: unknown) {
      setIsResending(false);
      setResendStatus({
        show: true,
        success: false,
        message: "Failed to send verification email. Please try again.",
      });
      console.error("Resend verification email error:", error);
    }
  };

  if (loading) {
    return <Loading label="Loading..." />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Email Verification
          </h2>
        </div>

        {/* Show resend option if user is logged in but not verified */}
        {!loading &&
          appwriteUser &&
          !appwriteUser.emailVerification &&
          !userId &&
          !secret && (
            <div className="text-center flex flex-col gap-3">
              <p className="text-gray-600">
                Please check your email for a verification link. If you
                haven&apos;t received it, click the button below to resend the
                verification email.
              </p>
              <p className="mt-4 text-sm text-gray-500">
                If you don&apos;t see the email, check your spam or junk folder.
              </p>
              <Button
                color="primary"
                isLoading={isResending}
                onPress={handleResendEmail}
                className="mt-4 w-full"
              >
                Resend Verification Email
              </Button>
            </div>
          )}

        {/* Show message if not logged in and no verification params */}
        {!loading && !appwriteUser && (!userId || !secret) && (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Please log in to verify your email or use a valid verification
              link.
            </p>
            <Button
              color="primary"
              onPress={() => router.push("/login")}
              className="w-full"
            >
              Go to Login
            </Button>
          </div>
        )}

        {resendStatus.show && (
          <div>
            <Alert
              message={resendStatus.success ? "Success" : "Error"}
              description={resendStatus.message}
              type={resendStatus.success ? "success" : "error"}
              showIcon
              className="mb-4"
            />
          </div>
        )}

        {/* Loading state */}
        {verificationStatus === "loading" && (
          <div className="text-center py-6">
            <Spin size="large" />
            <p className="mt-4 text-gray-600">Verifying your email...</p>
          </div>
        )}

        {/* Success state */}
        {verificationStatus === "success" && (
          <div className="space-y-4">
            <Alert
              message="Email Verified"
              description="Your email has been successfully verified. Redirecting to dashboard..."
              type="success"
              showIcon
            />
          </div>
        )}

        {/* Error state */}
        {verificationStatus === "error" && (
          <div className="space-y-4">
            <Alert
              message="Verification Failed"
              description={
                errorMessage ||
                "Unable to verify your email. The verification link may have expired."
              }
              type="error"
              showIcon
            />
            <div className="text-center mt-6">
              <Button
                color="primary"
                onPress={handleResendEmail}
                isLoading={isResending}
                className="w-full"
              >
                Request New Verification Email
              </Button>
              <Button
                color="primary"
                onPress={() => router.push("/login")}
                className="w-full mt-2"
              >
                Go to Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
