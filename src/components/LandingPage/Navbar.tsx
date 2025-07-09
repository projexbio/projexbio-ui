import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import AuthButtons from "./AuthButtons";
import { Tooltip } from "@heroui/react";
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
        <NavbarContent justify="start">
          <NavbarBrand as={Link} href="/" className="flex items-center gap-2">
            <Image
              src="/blackLogo.png"
              alt="ProjexBio Logo"
              width={48}
              height={48}
              className="h-12 w-12 flex-shrink-0"
            />
            <span className="font-blanka text-xl md:text-2xl lg:text-3xl font-bold text-white relative bottom-1">
              PROJEXBIO
            </span>
          </NavbarBrand>
        </NavbarContent>

        {/* Desktop Nav Links */}
        <NavbarContent
          className="hidden lg:flex gap-4 lg:gap-8 text-sm font-medium justify-center"
          justify="center"
        >
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
              <Tooltip content="Contribute on GitHub" size="sm">
                <FaGithub className="h-9 w-9 text-primary hover:text-secondary transition-colors duration-300" />
              </Tooltip>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <AuthButtons />
          </NavbarItem>
        </NavbarContent>

        {/* Mobile Menu Toggle and Menu */}
        <MobileMenu />
      </div>
    </HeroNavbar>
  );
};

export default Navbar;
