"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/designs", label: "Designs" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/classifieds", label: "Classifieds" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="https://cdn.prod.website-files.com/62f11fa14e9a1f17e8f28013/62f11fa14e9a1f8c65f28066_4b-New-Logo-with-KARNI-PIER-LLC-plus-dba-PIERS-2-U-300x178.jpeg"
              alt="Karni-Pier LLC dba Piers 2U - Custom Dock Builder Wisconsin"
              width={180}
              height={107}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-navy-800 hover:text-lake transition-colors rounded-md hover:bg-navy-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Phone + CTA (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:920-231-0841"
              className="text-navy-800 font-semibold text-sm hover:text-lake transition-colors"
              aria-label="Call us at 920-231-0841"
            >
              <span className="inline-block mr-1" aria-hidden="true">&#9742;</span>
              (920) 231-0841
            </a>
            <Link
              href="/contact"
              className="bg-lake text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-lake-dark transition-colors"
            >
              Get a Free Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-md text-navy-700 hover:bg-navy-50"
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-gray-100" aria-label="Mobile navigation">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-base font-medium text-navy-800 hover:text-lake hover:bg-navy-50 rounded-md"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-100 mt-3 space-y-3">
              <a
                href="tel:920-231-0841"
                className="block text-center text-navy-800 font-semibold hover:text-lake"
              >
                <span className="mr-1" aria-hidden="true">&#9742;</span>
                (920) 231-0841
              </a>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="block text-center bg-lake text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-lake-dark transition-colors"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
