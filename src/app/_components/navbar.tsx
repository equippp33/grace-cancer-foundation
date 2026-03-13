"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Our Activities", href: "#activities" },
  { label: "Impact", href: "#impact" },
  { label: "Cancer Run", href: "#cancer-run" },
  { label: "Volunteer", href: "#volunteer" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-rose-primary)] to-[var(--color-rose-dark)]">
            <span className="text-lg font-bold text-white">G</span>
          </div>
          <div>
            <span className="text-lg font-bold text-[var(--color-navy)]">
              Grace Cancer
            </span>
            <span className="block text-[10px] tracking-widest text-[var(--color-rose-primary)] uppercase">
              Foundation
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-[var(--color-rose-primary)]"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/express"
            className="rounded-full bg-gradient-to-r from-[var(--color-rose-primary)] to-[var(--color-rose-dark)] px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            Express Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 lg:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-6 bg-gray-700 transition-all ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-gray-700 transition-all ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-gray-700 transition-all ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-gray-100 bg-white px-4 pb-4 lg:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-medium text-gray-600 transition-colors hover:text-[var(--color-rose-primary)]"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/express"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-gradient-to-r from-[var(--color-rose-primary)] to-[var(--color-rose-dark)] px-6 py-2.5 text-center text-sm font-semibold text-white"
          >
            Express Now
          </Link>
        </div>
      )}
    </nav>
  );
}
