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
                variant="solid"
                className="px-6 py-3 bg-primary text-white rounded-full font-medium shadow-md hover:bg-purple-600"
              >
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/signup">
              <Button className="pearl-button bg-primary text-white hover:bg-primary min-w-[220px] h-[56px] flex items-center justify-center">
                <div className="wrap">
                  <p>Register your Institute</p>
                </div>
              </Button>
            </Link>
          )}
          <Link href="https://github.com/projexbio" target="_blank">
            <Button className="px-6 py-3 border border-gray-400 text-black rounded-large hover:bg-white hover:text-black transition flex items-center bg-secondary min-w-[180px] h-[40px] ml-0 md:ml-0">
              <FaGithub className="h-7 w-7 text-black" />
              <span className="ml-2">Contribute</span>
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
