"use client";
import { useState } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import AuthButtons from "./AuthButtons";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works?" },
  { href: "#faq", label: "FAQ's" },
];

export default function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div
        className="lg:hidden fixed top-3 right-4 z-[100] flex flex-col items-end"
        style={{ minWidth: "56px" }}
      >
        <button
          className="p-2 rounded border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {/* Hamburger icon */}
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <line x1="5" y1="7" x2="19" y2="7" />
            <line x1="5" y1="12" x2="19" y2="12" />
            <line x1="5" y1="17" x2="19" y2="17" />
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="fixed top-14 mt-2 right-0 z-[110] bg-black rounded-2xl shadow-2xl w-56 max-w-full p-2 border-2 border-primary">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base text-white hover:text-primary py-1 px-2 rounded transition-colors duration-200 block"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://github.com/projexbio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-secondary py-1 px-2 rounded transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              <FaGithub className="h-5 w-5" />
              <span className="truncate">Contribute on GitHub</span>
            </Link>
            <div className="mt-2">
              <AuthButtons />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
