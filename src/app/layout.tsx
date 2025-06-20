import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@ant-design/v5-patch-for-react-19";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ProjexBio",
  description: "Empowering Projects Across Campuses",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", type: "image/png" },
      { url: "/favicon-32x32.png", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
