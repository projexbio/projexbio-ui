"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  confirmVerification,
  sendVerificationEmail,
} from "@/lib/appwrite/auth";
import { Button, Alert, Spin } from "antd";
import Link from "next/link";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<
    "loading" | "success" | "error" | "idle"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);

  const userId = searchParams?.get("userId");
  console.log("userId", userId);
  const secret = searchParams?.get("secret");
  console.log("secret", secret);

  useEffect(() => {
    // Check if we have the required params for verification
    if (userId && secret) {
      verifyEmail(userId, secret);
    }
  }, [userId, secret]);

  const verifyEmail = async (userId: string, secret: string) => {
    setVerificationStatus("loading");

    try {
      await confirmVerification(userId, secret);
      setVerificationStatus("success");
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

  const handleResendEmail = async () => {
    setIsResending(true);

    try {
      await sendVerificationEmail("/signup/verify");
      setIsResending(false);
      alert("Verification email sent! Please check your inbox.");
    } catch (error: unknown) {
      setIsResending(false);
      alert("Failed to send verification email. Please try again.");
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

        {/* No parameters case */}
        {!userId && !secret && (
          <div className="space-y-4">
            <Alert
              message="Verification Required"
              description="Please click the verification link sent to your email address to complete your account verification."
              type="info"
              showIcon
            />

            <div className="text-center mt-6">
              <Button
                type="primary"
                loading={isResending}
                onClick={handleResendEmail}
                className="w-full"
              >
                Resend Verification Email
              </Button>
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Back to Login
              </Link>
            </div>
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
              description="Your email has been successfully verified. You can now log in to your account."
              type="success"
              showIcon
            />

            <div className="text-center mt-6">
              <Link href="/login">
                <Button type="primary" className="w-full">
                  Go to Login
                </Button>
              </Link>
            </div>
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
                loading={isResending}
                onClick={handleResendEmail}
                className="w-full"
              >
                Resend Verification Email
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
