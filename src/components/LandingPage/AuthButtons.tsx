"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { useAuth } from "@/contexts/AuthContext";

const AuthButtons = () => {
  const { appwriteUser } = useAuth();

  return (
    <>
      {appwriteUser ? (
        <Link href="/dashboard">
          <Button
            variant="solid"
            className="px-4 py-2 bg-brand-purple text-white text-sm font-semibold rounded-lg hover:bg-brand-blue transition"
          >
            Dashboard
          </Button>
        </Link>
      ) : (
        <>
          <Link href="/signup">
            <Button
              variant="solid"
              className="px-4 py-2 bg-white text-black font-semibold text-sm rounded-large hover:bg-gray-200 transition"
            >
              Join Now
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant="solid"
              className="px-4 py-2 bg-brand-purple text-white text-sm font-semibold rounded-b-large hover:bg-brand-blue transition"
            >
              Log In
            </Button>
          </Link>
        </>
      )}
    </>
  );
};

export default AuthButtons;
