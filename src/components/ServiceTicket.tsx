import type { Service } from "@/data/services";

const accentByCategory: Record<Service["category"], string> = {
  Hair: "var(--rose)",
  Skin: "var(--sage)",
  "Bridal & Occasion": "var(--gold)",
  "Finishing Touches": "var(--rose-deep)",
};

export default function ServiceTicket({ service }: { service: Service }) {
  return (
    <article
      id={service.slug}
      className="ticket grid scroll-mt-28 grid-cols-[1fr_auto] overflow-hidden rounded-sm"
    >
      <div className="p-5">
        <p className="eyebrow" style={{ color: accentByCategory[service.category] }}>
          {service.category}
        </p>
        <h3 className="mt-1.5 font-display text-lg text-[var(--ink)]">
          {service.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--charcoal-60)]">
          {service.description}
        </p>
      </div>
      <div className="perforation flex flex-col items-center justify-center gap-1 border-l border-dashed border-[var(--charcoal)]/20 px-5 py-5 text-center">
        <span className="font-mono text-lg text-[var(--ink)]">{service.price}</span>
        <span className="eyebrow text-[var(--charcoal-60)]">{service.duration}</span>
      </div>
    </article>
  );
}
