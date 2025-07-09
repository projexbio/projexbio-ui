"use client";

import { useTheme } from "next-themes";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // Determine current theme (default to light if not set)
  const isDark = (resolvedTheme || theme) === "dark";

  return (
    <button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`p-2 rounded-full transition-colors bg-white text-primary hover:bg-primary hover:text-white`}
    >
      {isDark ? <MdDarkMode size={20} /> : <MdLightMode size={20} />}
    </button>
  );
}
