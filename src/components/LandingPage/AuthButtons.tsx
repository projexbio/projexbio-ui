"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";

// Fetch user from your API route
const fetchUser = async () => {
  const res = await fetch("/api/auth/me");
  if (!res.ok) return null;
  return res.json();
};

const AuthButtons = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

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
        <Link href="/dashboard">
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
                variant="solid"
                className="px-4 py-2 bg-secondary text-black font-semibold text-sm rounded-large hover:bg-gray-200 transition"
              >
                Join Now
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="solid"
                className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-b-large hover:bg-brand-blue transition"
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
