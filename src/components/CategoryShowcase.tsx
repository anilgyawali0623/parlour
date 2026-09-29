"use client";

import Image from "next/image";
import { categoryImage } from "@/data/service-image";
import { categories, type Service } from "@/data/services";

export default function CategoryShowcase({
  active,
  onSelect,
}: {
  active: Service["category"] | "All";
  onSelect: (c: Service["category"] | "All") => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {categories.map((c) => {
        const isActive = active === c;
        return (
          <button
            key={c}
            onClick={() => {
    onSelect(isActive ? "All" : c);
    window.scrollBy({
      top: 520,
      behavior: "smooth",
    });
  }}
            className={`group relative aspect-[4/5] overflow-hidden rounded-sm transition ${
              isActive ? "ring-2 ring-[var(--ink)] ring-offset-2 ring-offset-[var(--paper-deep)]" : ""
            }`}
          >
            <Image
              src={categoryImage[c]}
              alt={c}
              fill
              sizes="(min-width: 640px) 25vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/70 via-[var(--ink)]/10 to-transparent" />
            <span className="eyebrow absolute bottom-3 left-3 text-[var(--paper)]">
              {c}
            </span>
          </button>
        );
      })}
    </div>
  );
}