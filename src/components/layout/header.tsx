"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, LogIn, User, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Logo component
const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="font-semibold text-xl tracking-tight">
      <span className="text-lime-bright">Pose</span>
      <span className="text-gray-dark">AI</span>
    </div>
  </div>
);

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Examples", href: "/examples" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  // This would be replaced with actual auth state
  const isLoggedIn = false;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200",
                  pathname === item.href
                    ? "text-lime-bright border-b-2 border-lime-bright"
                    : "text-gray-dark hover:text-lime-bright"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="flex items-center text-sm font-medium text-gray-dark hover:text-lime-bright"
                >
                  <User className="h-5 w-5 mr-1" />
                  <span>Dashboard</span>
                </Link>
                <button className="outline-button flex items-center">
                  <LogOut className="h-4 w-4 mr-1" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="flex items-center text-sm font-medium text-gray-dark hover:text-lime-bright"
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  <span>Login</span>
                </Link>
                <Link href="/signup" className="primary-button">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-dark hover:text-lime-bright focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  pathname === item.href
                    ? "text-lime-bright bg-lime-pale"
                    : "text-gray-dark hover:bg-lime-pale hover:text-lime-bright"
                )}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Auth */}
            <div className="pt-4 pb-3 border-t border-gray-100">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={closeMenu}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-dark hover:bg-lime-pale hover:text-lime-bright"
                  >
                    <div className="flex items-center">
                      <User className="h-5 w-5 mr-1" />
                      <span>Dashboard</span>
                    </div>
                  </Link>
                  <button
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-dark hover:bg-lime-pale hover:text-lime-bright"
                  >
                    <div className="flex items-center">
                      <LogOut className="h-5 w-5 mr-1" />
                      <span>Logout</span>
                    </div>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-dark hover:bg-lime-pale hover:text-lime-bright"
                  >
                    <div className="flex items-center">
                      <LogIn className="h-5 w-5 mr-1" />
                      <span>Login</span>
                    </div>
                  </Link>
                  <Link
                    href="/signup"
                    onClick={closeMenu}
                    className="block px-3 py-2 mt-1 rounded-md text-base font-medium bg-lime-bright text-gray-dark hover:bg-opacity-90"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
