"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about-us", dropdown: [{ name: "Architects", href: "/about-us/architects" }] },
  { name: "Construction", href: "/#creations" },
  { name: "Realty", href: "/#realty" },
  { name: "News & Updates", href: "/#news" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md py-4" : "bg-[#fcfbfa] py-6"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          {/* Recreating the logo from screenshot: K with 'KUMAR SAMARTHA CONSTRUCTION' below */}
          <div className="flex flex-col items-center justify-center">
            <span className="font-serif text-3xl font-bold tracking-widest" style={{ color: '#70503f' }}>KG</span>
            <span className="text-[8px] tracking-[0.2em] uppercase font-semibold mt-1" style={{ color: '#70503f' }}>
              Kumar Samartha
            </span>
            <span className="text-[6px] tracking-widest uppercase text-neutral-500">
              Construction
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href.split('#')[0]);
            return (
              <div key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className={`text-xs font-semibold tracking-widest uppercase relative py-2 px-4 transition-colors flex items-center ${
                    isActive 
                      ? "bg-[#70503f] text-white hover:bg-[#52382c]" 
                      : "text-[#70503f] hover:text-[#52382c]"
                  }`}
                >
                  {link.name}
                  {link.dropdown && (
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                {link.dropdown && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-neutral-100 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="py-2">
                      {link.dropdown.map((dropLink) => (
                        <Link
                          key={dropLink.name}
                          href={dropLink.href}
                          className="block px-4 py-2 text-xs font-semibold tracking-widest uppercase text-[#70503f] hover:bg-[#fcfbfa] hover:text-[#52382c] transition-colors"
                        >
                          {dropLink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#70503f] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-neutral-100 px-6 py-6 shadow-xl absolute w-full"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm font-semibold text-[#70503f] uppercase tracking-widest py-2 border-b border-neutral-100"
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="pl-4 mt-2 flex flex-col space-y-2 border-l-2 border-[#70503f] opacity-80">
                      {link.dropdown.map((dropLink) => (
                        <Link
                          key={dropLink.name}
                          href={dropLink.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-xs font-semibold text-[#70503f] uppercase tracking-widest py-2 hover:text-[#52382c]"
                        >
                          {dropLink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
