"use client";
import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import AuthButtons from "./AuthButtons";
import { Button, Tooltip } from "@heroui/react";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { useState } from "react";
// import MobileMenu from "./MobileMenu";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works?" },
  { href: "#faq", label: "FAQ's" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <HeroNavbar
      className="top-2 m-auto bg-default-900 border border-primary rounded-2xl shadow-lg"
      classNames={{
        base: "max-w-7xl",
        wrapper: "max-w-7xl px-2 py-1",
      }}
      height="10"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent justify="start">
        <NavbarBrand as={Link} href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo/white-without-bg.png"
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
        className="hidden md:flex gap-4 lg:gap-8 text-sm font-medium justify-center"
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

      {/* AuthButtons - Always visible */}
      <NavbarContent className="flex items-center gap-1 md:gap-2" justify="end">
        <NavbarItem className="hidden md:flex">
          <Link
            href="https://github.com/projexbio"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center"
          >
            <Tooltip content="Contribute on GitHub" size="sm">
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                className="bg-transparent border-none hover:bg-transparent hover:border-none text-white"
              >
                <FaGithub size={30} />
              </Button>
            </Tooltip>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <AuthButtons />
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>
  );
};

export default Navbar;
