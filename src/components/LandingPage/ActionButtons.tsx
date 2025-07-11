"use client";

import Link from "next/link";
import { Button, Spinner } from "@heroui/react";
import { FaGithub } from "react-icons/fa";
import { useCurrentUser } from "@/lib/query/useCurrentUser";
import "@/app/styles/pearl-button.css";

export default function ActionButtons() {
  const { data: user, isLoading } = useCurrentUser();

  return (
    <div className="flex gap-8 items-center justify-center lg:justify-start">
      {isLoading ? (
        <Spinner variant="wave" />
      ) : (
        <div className="flex gap-4 items-center justify-center flex-wrap">
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
            <Link href="https://forms.gle/ybJZ1dTinK3kdZqo6" target="_blank">
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
              size="sm"
              className="border border-gray-400 transition flex items-center ml-0"
            >
              <FaGithub size={20} />
              <span>Contribute</span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
