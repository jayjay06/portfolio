"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  // Trigger slide-down mount animation
  useEffect(() => {
    setMounted(true);
  }, []);

  // Add drop-shadow when page is scrolled
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active hash for nav link highlight
  useEffect(() => {
    const handleHashChange = () => setActiveHash(window.location.hash);
    setActiveHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50",
        "backdrop-blur-md bg-slate-950/80",
        "transition-[transform,opacity,box-shadow] duration-500",
        scrolled ? "shadow-lg shadow-black/30" : "",
        mounted ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <nav
        aria-label="Main navigation"
        className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4"
      >
        {/* Logo / name */}
        <Link
          href="/"
          className="text-slate-50 font-semibold text-lg tracking-tight hover:text-white transition-colors duration-200"
        >
          Jason Jellin
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={[
                  "text-sm font-medium transition-colors duration-200 hover:text-white",
                  activeHash === href
                    ? "text-white underline underline-offset-4"
                    : "text-slate-400",
                ].join(" ")}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger button */}
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-slate-400 hover:text-white transition-colors duration-200"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
        </button>
      </nav>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-slate-800 bg-slate-950/95"
        >
          <ul
            className="max-w-6xl mx-auto flex flex-col gap-1 px-6 py-4"
            role="list"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={[
                    "block py-2 text-sm font-medium transition-colors duration-200 hover:text-white",
                    activeHash === href
                      ? "text-white underline underline-offset-4"
                      : "text-slate-400",
                  ].join(" ")}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
