"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import SectionHeading from "@/components/SectionHeading";
import ServiceTicket from "@/components/ServiceTicket";
import SearchBox from "@/components/SearchBox";
import { services, categories, type Service } from "@/data/services";

export default function ServicesExplorer() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(urlQuery);
  const [lastUrlQuery, setLastUrlQuery] = useState(urlQuery);
  const [activeCategory, setActiveCategory] = useState<Service["category"] | "All">("All");

  // Keep local search state in sync when the URL's ?q= changes (e.g. via header search),
  // without triggering a setState-in-effect render cascade.
  if (urlQuery !== lastUrlQuery) {
    setLastUrlQuery(urlQuery);
    setQuery(urlQuery);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((s) => {
      const matchesCategory = activeCategory === "All" || s.category === activeCategory;
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.keywords.some((k) => k.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  const grouped = useMemo(() => {
    const map = new Map<string, Service[]>();
    for (const s of filtered) {
      if (!map.has(s.category)) map.set(s.category, []);
      map.get(s.category)!.push(s);
    }
    return map;
  }, [filtered]);

  return (
    <>
      <section className="border-b border-[var(--charcoal)]/10 bg-[var(--paper-deep)]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeading eyebrow="The full menu" title="Services & pricing" />
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--charcoal-60)]">
            Every price reflects a single stylist&rsquo;s undivided time. Search
            by treatment, or filter by category below.
          </p>

          <div className="mt-8 max-w-md">
            <SearchBox variant="inline" />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {(["All", ...categories] as const).map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition ${
                  activeCategory === c
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                    : "border-[var(--charcoal)]/20 text-[var(--charcoal-60)] hover:border-[var(--ink)]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        {filtered.length === 0 ? (
          <p className="py-10 text-center text-[var(--charcoal-60)]">
            Nothing matches that search. Try a different word, like &ldquo;colour&rdquo;
            or &ldquo;facial&rdquo;.
          </p>
        ) : (
          <div className="space-y-14">
            {Array.from(grouped.entries()).map(([category, items]) => (
              <div key={category}>
                <h2 className="font-display text-2xl text-[var(--ink)]">{category}</h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {items.map((s) => (
                    <ServiceTicket key={s.slug} service={s} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
