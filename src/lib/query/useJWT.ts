import { useQuery } from "@tanstack/react-query";
import { Account } from "appwrite";
import { client } from "@/lib/appwrite/client";
import { queryClient } from "./queryClient";
import { appwriteUserQueryKeys } from "./useAppwriteUser";

// Query key for JWT
export const jwtQueryKeys = {
  all: ["jwt"] as const,
  current: () => [...jwtQueryKeys.all, "current"] as const,
} as const;

/**
 * TanStack Query hook for JWT management
 * Automatically refetches JWT every 12 minutes
 * Only runs if user has an active session
 */
export const useJWT = () => {
  return useQuery({
    queryKey: jwtQueryKeys.current(),
    queryFn: async (): Promise<string> => {
      const account = new Account(client);
      const jwt = await account.createJWT();
      return jwt.jwt;
    },
    staleTime: 12 * 60 * 1000, // 12 minutes - JWT specific timing
    gcTime: 15 * 60 * 1000, // 15 minutes - JWT specific timing
    retry: false, // Don't retry if no session
  });
};

/**
 * Utility function to get JWT (for use outside React components)
 * This replaces the old getJWT function from jwt.ts
 * Uses TanStack Query cache when available
 */
export const getJWT = async (): Promise<string> => {
  // Check if we have cached appwrite user data first
  const cachedAppwriteUser = queryClient.getQueryData(
    appwriteUserQueryKeys.current(),
  );

  // If no cached user data, user is likely not authenticated
  if (!cachedAppwriteUser) {
    throw new Error("No active session");
  }

  // Try to get JWT from cache
  const cachedJWT = queryClient.getQueryData(jwtQueryKeys.current());

  if (cachedJWT) {
    return cachedJWT as string;
  }

  // If no cache, fetch and cache the JWT
  const fetchJWT = async (): Promise<string> => {
    const account = new Account(client);
    const jwt = await account.createJWT();
    return jwt.jwt;
  };

  // Use queryClient.fetchQuery to fetch and cache
  return await queryClient.fetchQuery({
    queryKey: jwtQueryKeys.current(),
    queryFn: fetchJWT,
    staleTime: 12 * 60 * 1000, // 12 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
};
