"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { services } from "@/data/services";

export default function SearchBox({
  variant = "header",
}: {
  variant?: "header" | "inline";
}) {
  const [open, setOpen] = useState(variant === "inline");
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return services
      .filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.keywords.some((k) => k.toLowerCase().includes(q))
      )
      .slice(0, 6);
  }, [query]);

  useEffect(() => {
    if (open && variant === "header") inputRef.current?.focus();
  }, [open, variant]);

  function goToResults(e?: React.FormEvent) {
    e?.preventDefault();
    if (!query.trim()) return;
    router.push(`/services?q=${encodeURIComponent(query.trim())}`);
    if (variant === "header") setOpen(false);
  }

  if (variant === "header" && !open) {
    return (
      <button
        aria-label="Search services"
        onClick={() => setOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--charcoal)]/15 text-[var(--charcoal)] transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
      >
        <Search size={17} strokeWidth={1.75} />
      </button>
    );
  }

  return (
    <div className={variant === "header" ? "relative" : "relative w-full"}>
      <form
        onSubmit={goToResults}
        role="search"
        className={`flex items-center gap-2 border-b-2 border-[var(--ink)] pb-2 ${
          variant === "inline" ? "" : "w-64"
        }`}
      >
        <Search size={16} strokeWidth={1.75} className="shrink-0 opacity-60" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            variant === "inline"
              ? "Search cut, colour, facial, bridal…"
              : "Search services…"
          }
          aria-label="Search services"
          className="w-full bg-transparent font-body text-sm outline-none placeholder:text-[var(--charcoal-60)]"
          onKeyDown={(e) => {
            if (e.key === "Escape" && variant === "header") setOpen(false);
          }}
        />
        {variant === "header" && (
          <button
            type="button"
            aria-label="Close search"
            onClick={() => {
              setOpen(false);
              setQuery("");
            }}
            className="shrink-0 opacity-60 transition hover:opacity-100"
          >
            <X size={16} strokeWidth={1.75} />
          </button>
        )}
      </form>

      {query.trim() && (
        <div
          className={`${
            variant === "header"
              ? "absolute right-0 top-full z-30 mt-2 w-80"
              : "mt-3"
          } max-h-80 overflow-auto rounded-sm border border-[var(--charcoal)]/12 bg-[var(--paper)] shadow-xl`}
        >
          {results.length === 0 ? (
            <p className="px-4 py-4 text-sm text-[var(--charcoal-60)]">
              No services match “{query}”. Try “colour”, “facial”, or “bridal”.
            </p>
          ) : (
            <ul>
              {results.map((s) => (
                <li key={s.slug} className="border-b border-[var(--charcoal)]/8 last:border-none">
                  <Link
                    href={`/services?q=${encodeURIComponent(s.name)}#${s.slug}`}
                    onClick={() => variant === "header" && setOpen(false)}
                    className="flex items-center justify-between gap-3 px-4 py-3 text-sm transition hover:bg-[var(--paper-deep)]"
                  >
                    <span>
                      <span className="block font-medium">{s.name}</span>
                      <span className="eyebrow text-[var(--charcoal-60)]">
                        {s.category}
                      </span>
                    </span>
                    <span className="font-mono text-xs text-[var(--gold)]">
                      {s.price}
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={goToResults}
                  className="w-full px-4 py-3 text-left text-sm font-medium text-[var(--rose-deep)] transition hover:bg-[var(--paper-deep)]"
                >
                  See all results for “{query}” →
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
