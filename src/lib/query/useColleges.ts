import { useQuery } from "@tanstack/react-query";
import { CollegeService } from "../api/colleges";
import { College } from "@/types/college";

// Query keys for colleges
export const collegeQueryKeys = {
  all: ["colleges"] as const,
  list: () => [...collegeQueryKeys.all, "list"] as const,
} as const;

/**
 * TanStack Query hook for fetching all colleges
 * Replaces useEffect-based API calls in CollegeInfo component
 */
export const useColleges = () => {
  return useQuery({
    queryKey: collegeQueryKeys.list(),
    queryFn: async (): Promise<College[]> => {
      const response = await CollegeService.getAllColleges();
      return response.data;
    },
    staleTime: 1000 * 60 * 30, // 30 minutes - colleges don't change often
    gcTime: 1000 * 60 * 60, // 1 hour - keep in memory longer
  });
};
