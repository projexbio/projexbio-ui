import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import AuthButtons from "./AuthButtons";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/how-it-works", label: "How it works?" },
  { href: "/FAQ's", label: "FAQ's" },
];

const Navbar = () => {
  return (
    <HeroNavbar
      className="sticky w-full top-0 z-50 px-4 py-2"
      maxWidth="xl"
      isBordered={false}
      style={{ background: "transparent" }}
    >
      <div className="w-full bg-black/90 backdrop-blur-md shadow-lg rounded-[2rem] px-6 py-2 border-[2.5px] border-[#7828c8] flex items-center justify-between">
        <NavbarBrand as={Link} href="/" className="flex items-center gap-2">
          <Image
            src="/blackLogo.png"
            alt="ProjexBio Logo"
            width={28}
            height={28}
            className="h-7 w-7"
          />
          <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            PROJEXBIO
          </span>
        </NavbarBrand>

        <NavbarContent className="hidden md:flex gap-8 text-sm font-medium">
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

        <NavbarContent className="flex items-center gap-6" justify="end">
          <NavbarItem>
            <Link
              href="https://github.com/projexbio"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center"
            >
              <FaGithub className="h-9 w-9 text-primary hover:text-secondary transition-colors duration-300" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
                Contribute on GitHub
              </span>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <AuthButtons />
          </NavbarItem>
        </NavbarContent>

        {/* Mobile Menu Toggle */}
        <NavbarMenuToggle className="md:hidden" />
      </div>

      {/* Mobile Menu */}
      <NavbarMenu className="md:hidden bg-black/90 rounded-b-[2rem] border-t border-[#7828c8]">
        {navLinks.map((link) => (
          <NavbarMenuItem key={link.href}>
            <Link
              href={link.href}
              className="block py-2 px-4 text-white hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Link
            href="https://github.com/projexbio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white hover:text-secondary"
          >
            <FaGithub className="h-6 w-6" />
            Contribute on GitHub
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <AuthButtons />
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroNavbar>
  );
};

export default Navbar;
