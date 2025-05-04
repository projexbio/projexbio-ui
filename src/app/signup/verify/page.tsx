"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { client } from "@/lib/appwrite/client";
import { Account } from "appwrite";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function VerifyPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [message, setMessage] = useState(
    "Please check your email for a verification link."
  );
  const [verified, setVerified] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, checkAuthStatus } = useAuth();

  useEffect(() => {
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    // If URL has verification parameters, process verification
    if (userId && secret) {
      const verifyEmail = async () => {
        setIsVerifying(true);
        try {
          const account = new Account(client);
          await account.updateVerification(userId, secret);

          setVerified(true);
          setMessage("Your email has been verified successfully!");

          // Refresh auth status
          await checkAuthStatus();

          // Redirect to registration page after 2 seconds
          setTimeout(() => {
            router.push("/registration");
          }, 2000);
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error("Verification failed:", err);
            setMessage(`Verification failed: ${err.message}`);
          }
        } finally {
          setIsVerifying(false);
        }
      };

      verifyEmail();
    }
  }, [searchParams, router, checkAuthStatus]);

  // If not authenticated, prompt to log in
  useEffect(() => {
    if (!user && !isVerifying) {
      setMessage("Please log in to verify your account.");
    }
  }, [user, isVerifying]);

  // If no verification parameters yet, show instructions
  const sendVerificationEmail = async () => {
    if (!user) return;

    setIsVerifying(true);
    try {
      const account = new Account(client);
      await account.createVerification(
        `${window.location.origin}/signup/verify`
      );
      setMessage("Verification email sent! Please check your inbox.");
    } catch (err: unknown) {
      console.error("Failed to send verification email:", err);
      setMessage(
        `Failed to send verification email: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-6">Email Verification</h1>

        <p className="mb-6 text-gray-700">{message}</p>

        {!verified && user && !searchParams.get("secret") && (
          <button
            onClick={sendVerificationEmail}
            disabled={isVerifying}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
          >
            {isVerifying ? "Sending..." : "Resend Verification Email"}
          </button>
        )}

        {!user && (
          <Link href="/login">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Log In
            </button>
          </Link>
        )}

        {verified && (
          <div className="mt-4 text-green-600">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="mt-2">Redirecting to complete your registration...</p>
          </div>
        )}
      </div>
    </div>
  );
}
