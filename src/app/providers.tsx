// app/providers.tsx
"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { HeroUIProvider } from "@heroui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <AntdRegistry>
        <AuthProvider>{children}</AuthProvider>
      </AntdRegistry>
    </HeroUIProvider>
  );
}
