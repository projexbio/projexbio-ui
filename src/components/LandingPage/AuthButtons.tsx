"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { useCurrentUser } from "@/lib/query/useCurrentUser";

const AuthButtons = () => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <Button
        variant="solid"
        className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg opacity-70 cursor-not-allowed"
        disabled
      >
        Loading...
      </Button>
    );
  }

  return (
    <>
      {user ? (
        <Link href="/explore">
          <Button
            variant="solid"
            className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-brand-blue transition"
          >
            Dashboard
          </Button>
        </Link>
      ) : (
        <>
          <div className="flex gap-2">
            <Link href="/signup">
              <Button
                variant="bordered"
                color="primary"
                className="hidden md:flex text-default font-semibold text-sm rounded-lg"
              >
                Sign Up
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="solid"
                color="primary"
                className="text-white font-semibold rounded-lg"
              >
                Log In
              </Button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default AuthButtons;
