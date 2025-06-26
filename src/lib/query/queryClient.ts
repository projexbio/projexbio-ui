import { QueryClient } from "@tanstack/react-query";

// Create a singleton queryClient instance that can be used outside React
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 15, // 15 minutes
      gcTime: 1000 * 60 * 20, // 20 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true,
      retryOnMount: true,
      retry: 2,
    },
  },
});
