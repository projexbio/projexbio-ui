import { useQuery } from "@tanstack/react-query";
import { UserService } from "../api/users";
import { User } from "@/types/user";
import { useAppwriteUser } from "./useAppwriteUser";

// Query key factory for user-related queries
export const userQueryKeys = {
  all: ["users"] as const,
  current: () => [...userQueryKeys.all, "current"] as const,
} as const;

/**
 * TanStack Query hook for fetching current user data
 * Only runs if user has an active Appwrite session
 * @returns Query object with user data, loading state, and error information
 */
export const useCurrentUser = () => {
  const { data: appwriteUser, isLoading: appwriteLoading } = useAppwriteUser();

  return useQuery({
    queryKey: userQueryKeys.current(),
    queryFn: async (): Promise<User> => {
      const response = await UserService.getCurrentUser();
      return response.data;
    },
    enabled: !!appwriteUser && !appwriteLoading, // Only run if appwrite user exists
    retry: (failureCount, error: unknown) => {
      // Don't retry on 404 (user not found) - redirect to onboarding instead
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as { response: { status: number } };
        if (axiosError.response?.status === 404) {
          return false;
        }
        // Don't retry on 401 (unauthorized) - user not authenticated
        if (axiosError.response?.status === 401) {
          return false;
        }
      }
      // Retry other errors up to 2 times (global default)
      return failureCount < 2;
    },
  });
};
