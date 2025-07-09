import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import AuthButtons from "./AuthButtons";
import ThemeToggle from "./ThemeToggle";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works?" },
  { href: "#faq", label: "FAQ's" },
];

const Navbar = () => {
  return (
    <HeroNavbar
      className="w-full top-0 z-50 px-2 md:px-6 py-2"
      maxWidth="xl"
      isBordered={false}
      style={{ background: "transparent" }}
    >
      <div className="w-full bg-black/90 shadow-lg rounded-3xl px-2 md:px-6 py-2 border-[2.5px] border-[#7828c8] flex items-center justify-between">
        <NavbarBrand as={Link} href="/" className="flex items-center gap-2">
          <Image
            src="/blackLogo.png"
            alt="ProjexBio Logo"
            width={48}
            height={48}
            className="h-12 w-12 flex-shrink-0"
          />
          <span className="font-blanka text-xl md:text-2xl lg:text-3xl font-bold text-primary relative bottom-1">
            PROJEXBIO
          </span>
        </NavbarBrand>

        {/* Desktop Nav Links */}
        <NavbarContent className="hidden lg:flex gap-4 lg:gap-8 text-sm font-medium justify-center">
          {navLinks.map((link) => (
            <NavbarItem key={link.href}>
              <Link
                href={link.href}
                className="text-white hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* Desktop Actions */}
        <NavbarContent
          className="hidden lg:flex items-center gap-2"
          justify="end"
        >
          <NavbarItem>
            <Link
              href="https://github.com/projexbio"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center"
            >
              <FaGithub className="h-9 w-9 text-primary hover:text-secondary transition-colors duration-300" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg z-50">
                Contribute on GitHub
              </span>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <AuthButtons />
          </NavbarItem>
          <NavbarItem>
            <ThemeToggle />
          </NavbarItem>
        </NavbarContent>

        {/* Mobile Menu Toggle and Menu */}
        <MobileMenu />
      </div>
    </HeroNavbar>
  );
};

export default Navbar;
