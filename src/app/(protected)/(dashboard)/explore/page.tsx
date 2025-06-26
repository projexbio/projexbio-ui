"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <Link href="/">Home</Link>
      The current theme is: {theme}
      <button onClick={() => setTheme("light")}>Light Mode</button>
      <button onClick={() => setTheme("dark")}>Dark Mode</button>
      <div className="flex flex-wrap gap-4 items-center">
        <Button color="default">Default</Button>
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="danger">Danger</Button>
      </div>
    </div>
  );
}
