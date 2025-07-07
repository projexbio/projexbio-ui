// app/providers.tsx
"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/query/queryClient";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <HeroUIProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AntdRegistry>{children}</AntdRegistry>
        </ThemeProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  );
}
