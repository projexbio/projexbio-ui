"use client";

import Link from "next/link";
import { Button, Spinner } from "@heroui/react";
import { FaGithub } from "react-icons/fa";
import { useCurrentUser } from "@/lib/query/useCurrentUser";
import "@/app/styles/pearl-button.css";

export default function ActionButtons() {
  const { data: user, isLoading } = useCurrentUser();

  return (
    <div className="flex gap-8 items-center">
      {isLoading ? (
        <Spinner variant="wave" />
      ) : (
        <>
          {user ? (
            <Link href="/explore">
              <Button
                color="primary"
                className="pearl-button min-w-[220px] h-[56px] flex items-center justify-center"
              >
                <div className="wrap">Go to Dashboard</div>
              </Button>
            </Link>
          ) : (
            <Link href="/signup">
              <Button
                color="primary"
                className="pearl-button min-w-[220px] h-[56px] flex items-center justify-center"
              >
                <div className="wrap">Register your Institute</div>
              </Button>
            </Link>
          )}
          <Link href="https://github.com/projexbio" target="_blank">
            <Button
              color="secondary"
              variant="solid"
              className="border border-gray-400 transition flex items-center min-w-[180px] ml-0 md:ml-0"
            >
              <FaGithub className="h-7 w-7" />
              <span className="ml-2">Contribute</span>
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
