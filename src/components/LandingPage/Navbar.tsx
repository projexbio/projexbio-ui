import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import AuthButtons from "./AuthButtons";

const Navbar = () => {
  return (
    <nav className="static w-full px-4 py-2 z-50 top-0">
      <div className="max-w-7xl mx-auto bg-black/90 backdrop-blur-md shadow-lg rounded-full px-4 py-2 border border-brand-purple/30 flex items-center justify-between">
        {/* Logo and Title */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/blackLogo.png"
            alt="ProjexBio Logo"
            width={28}
            height={28}
            className="h-7 w-7"
          />
          <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
            PROJEXBIO
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <NavLink href="/features">Features</NavLink>
          <NavLink href="/how-it-works">How it works?</NavLink>
          <NavLink href="/institutions">For Institutions</NavLink>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {/* GitHub Contribution Button */}
          <Link
            href="https://github.com/projexbio/projexbio-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center"
          >
            <FaGithub className="h-9 w-9 text-brand-purple hover:text-brand-blue transition-colors duration-300" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
              Contribute on GitHub
            </span>
          </Link>

          {/* Auth Buttons */}
          <AuthButtons />
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="text-white hover:text-brand-purple transition-colors duration-200"
  >
    {children}
  </Link>
);

export default Navbar;
