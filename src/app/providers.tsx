// app/providers.tsx
"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
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
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <HeroUIProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AntdRegistry>
            <AuthProvider>{children}</AuthProvider>
          </AntdRegistry>
        </ThemeProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  );
}
