"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  confirmVerification,
  sendVerificationEmail,
} from "@/lib/appwrite/auth";
import { Button, Alert, Spin } from "antd";
import { useAuth } from "@/contexts/AuthContext";

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
  const { appwriteUser, loading } = useAuth();
  const [verificationAttempted, setVerificationAttempted] = useState(false);
  const redirectingRef = useRef(false);

  const userId = searchParams?.get("userId");
  const secret = searchParams?.get("secret");

  useEffect(() => {
    // If already verified, redirect to home

    // If logged in but not verified, show the verification needed state
    if (!loading && appwriteUser && !appwriteUser.emailVerification) {
      return;
    }

    if (!loading && appwriteUser && appwriteUser.emailVerification) {
      router.push("/explore");
      return;
    }

    // If not logged in and no verification params, redirect to login
    if (!loading && !appwriteUser && (!userId || !secret)) {
      router.push("/login");
      return;
    }

    // Only verify if we haven't already attempted verification
    if (userId && secret && !verificationAttempted && !redirectingRef.current) {
      const verifyEmail = async () => {
        setVerificationStatus("loading");
        setVerificationAttempted(true);

        try {
          await confirmVerification(userId, secret);
          setVerificationStatus("success");

          // Set the redirecting flag before starting redirect process
          redirectingRef.current = true;

          // Increase timeout to give more time for the success message to be visible
          setTimeout(() => {
            window.location.href = "/explore"; // Use direct location change for more reliable redirect
          }, 2500);
        } catch (error: unknown) {
          setVerificationStatus("error");
          if (error instanceof Error) {
            setErrorMessage(
              error.message || "Failed to verify email. Please try again."
            );
            console.error("Email verification error:", error);
          } else {
            setErrorMessage("An unknown error occurred. Please try again.");
            console.error("Unknown error:", error);
          }
        }
      };

      verifyEmail();
    }
  }, [userId, secret, router, loading, appwriteUser, verificationAttempted]);

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Email Verification
          </h2>
        </div>

        {!loading && appwriteUser && !appwriteUser.emailVerification && (
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
              type="primary"
              loading={isResending}
              onClick={handleResendEmail}
              className="mt-4 w-full"
            >
              Resend Verification Email
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
              description="Your email has been successfully verified. Redirecting to registration page..."
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
                type="primary"
                onClick={handleResendEmail}
                loading={isResending}
                className="w-full"
              >
                Request New Verification Email
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
