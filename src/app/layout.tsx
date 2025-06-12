import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "@ant-design/v5-patch-for-react-19";
import "./globals.css";
import "./styles/noise.css";  // Add this import
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui"],
  variable: "--font-inter",
});

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: "--font-anton",
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
    <html lang="en" className={`${inter.variable} ${anton.variable}`}>
      <body className="min-h-screen bg-black antialiased">
        <div className="noise">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
