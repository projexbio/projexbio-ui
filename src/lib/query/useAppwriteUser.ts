import { useQuery, useMutation } from "@tanstack/react-query";
import { getCurrentAppwriteUser, logoutUser } from "@/lib/appwrite/auth";
import { Models } from "appwrite";
import { refreshAuthData } from "./useRefreshAuth";

// Query keys for appwrite user
export const appwriteUserQueryKeys = {
  all: ["appwriteUser"] as const,
  current: () => [...appwriteUserQueryKeys.all, "current"] as const,
} as const;

/**
 * TanStack Query hook for fetching current Appwrite user
 */
export const useAppwriteUser = () => {
  return useQuery({
    queryKey: appwriteUserQueryKeys.current(),
    queryFn: async (): Promise<Models.User<Models.Preferences> | null> => {
      try {
        const appwriteUser = await getCurrentAppwriteUser();
        return appwriteUser;
      } catch {
        // If user is not authenticated, return null instead of throwing
        return null;
      }
    },
    staleTime: 1000 * 60 * 10, // 10 minutes - shorter than user data
    retry: 1, // Don't retry too much for auth errors
  });
};

/**
 * TanStack Query mutation for logout
 * Invalidates all auth-related queries and performs logout
 */
export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      await logoutUser();
    },
    onSuccess: async () => {
      // Refresh all auth data after successful logout
      await refreshAuthData();
    },
    onError: async (error) => {
      console.error("Logout failed:", error);
      // Even if logout fails, refresh auth data
      await refreshAuthData();
    },
  });
};
