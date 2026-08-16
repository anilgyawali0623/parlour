"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import SearchBox from "./SearchBox";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--charcoal)]/10 bg-[var(--paper)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--ink)] font-display text-sm text-[var(--ink)]">
            A&A
          </span>
          <span className="font-display text-lg tracking-tight text-[var(--ink)]">
            Aura &amp; Ash
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`eyebrow transition hover:text-[var(--rose-deep)] ${
                pathname === l.href
                  ? "text-[var(--ink)]"
                  : "text-[var(--charcoal-60)]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <SearchBox />
          </div>
          <Link
            href="/contact"
            className="hidden rounded-full bg-[var(--ink)] px-5 py-2 font-mono text-xs uppercase tracking-wider text-[var(--paper)] transition hover:bg-[var(--rose-deep)] sm:inline-block"
          >
            Book a slot
          </Link>
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--charcoal)]/15 md:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-[var(--charcoal)]/10 bg-[var(--paper)] px-6 py-5 md:hidden">
          <div className="mb-5">
            <SearchBox variant="inline" />
          </div>
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-xl text-[var(--ink)]"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-block rounded-full bg-[var(--ink)] px-5 py-2.5 text-center font-mono text-xs uppercase tracking-wider text-[var(--paper)]"
            >
              Book a slot
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
