import Link from "next/link";
import { Scissors, Droplet, Gem, Eye } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ServiceTicket from "@/components/ServiceTicket";
import { services } from "@/data/services";

const featured = services.filter((s) =>
  [
    "signature-cut-finish",
    "balayage-color-melt",
    "signature-facial",
    "bridal-trial",
  ].includes(s.slug)
);

const process = [
  {
    n: "01",
    title: "Tell us what's on your mind",
    body: "Book online or by phone and note whatever you're chasing — a colour change, an event, or just an hour to yourself.",
  },
  {
    n: "02",
    title: "A ten-minute consult",
    body: "Every visit opens with a short conversation before a single tool touches your hair or skin.",
  },
  {
    n: "03",
    title: "The service itself",
    body: "Unhurried, one client per stylist at a time — no double-booked chairs, ever.",
  },
  {
    n: "04",
    title: "A note for next time",
    body: "You leave with product notes and a suggested rebook window, not a hard sell.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="bg-[var(--ink)] text-[var(--paper)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-20 pt-16 sm:pt-24 md:grid-cols-[1.1fr_0.9fr] md:gap-6">
          <div>
           
            <h1 className="mt-4 font-display text-5xl leading-[1.05] sm:text-6xl">
              Hair, skin, and
              <br />
              <span className="italic text-[var(--rose)]">occasion styling,</span>
              <br />
              held to one chair at a time.
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[var(--paper)]/75">
              Neva Threading & Beauty Salon books a single client per stylist, so your slot is
              never split with someone else&rsquo;s blow-dry. 
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-[var(--rose)] px-6 py-3 font-mono text-xs uppercase tracking-wider text-[var(--ink)] transition hover:bg-[var(--gold-soft)]"
              >
                Book your slot
              </Link>
              <Link
                href="/services"
                className="font-mono text-xs uppercase tracking-wider text-[var(--paper)]/80 underline decoration-[var(--paper)]/30 underline-offset-4 transition hover:text-[var(--paper)]"
              >
                See the full services
              </Link>
            </div>
          </div>

          {/* signature ticket card */}
          {/*  later image */}
        </div>
      </section>

      {/* PILLARS */}
      <section className="border-b border-[var(--charcoal)]/10 bg-[var(--paper-deep)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:grid-cols-3">
  {[
    {
      icon: Scissors,
      label: "Threading",
      body: "Precise brow and facial threading for clean, defined results that complement your features.",
    },
    {
      icon: Droplet,
      label: "Waxing",
      body: "Gentle and thorough waxing services for smooth, polished skin with lasting results.",
    },
    {
      icon: Gem,
      label: "Facial",
      body: "Refreshing facial treatments tailored to your skin for a healthy, radiant glow.",
    },
    {
      icon: Eye,
      label: "Lashes",
      body: "Beautiful lash treatments designed to enhance your eyes and create an effortless finish.",
    },
  ].map(({ icon: Icon, label, body }) => (
    <div key={label} className="flex flex-col items-start gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold)] text-[var(--gold)]">
        <Icon size={17} strokeWidth={1.5} />
      </span>
      <h3 className="font-display text-xl text-[var(--ink)]">{label}</h3>
      <p className="text-sm leading-relaxed text-[var(--charcoal-60)]">
        {body}
      </p>
    </div>
  ))}
</div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="A few favourites" title="Frequently booked" />
          <Link
            href="/services"
            className="font-mono text-xs uppercase tracking-wider text-[var(--rose-deep)] underline underline-offset-4"
          >
            View full menu →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {featured.map((s) => (
            <ServiceTicket key={s.slug} service={s} />
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-[var(--ink)] text-[var(--paper)]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading eyebrow="What to expect" title="Your visit, in order" light />
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step) => (
              <div key={step.n} className="border-t border-[var(--paper)]/20 pt-5">
                <span className="font-mono text-sm text-[var(--gold-soft)]">{step.n}</span>
                <h3 className="mt-3 font-display text-lg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--paper)]/70">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL STRIP */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            { quote: "The only salon where I've never once felt rushed out of the chair.", name: "R. Okonkwo" },
            { quote: "My colourist actually remembers what we mixed last time.", name: "S. Duarte" },
            { quote: "Booked my bridal trial and day-of here — worth every minute of the trial.", name: "L. Byrne" },
          ].map((t) => (
            <figure key={t.name} className="ticket rounded-sm p-6">
              <blockquote className="font-display text-lg italic leading-snug text-[var(--ink)]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="perforation mt-4 pt-3 font-mono text-xs text-[var(--charcoal-60)]">
                {t.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-[var(--rose)]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-14 sm:flex-row sm:items-center">
          <h2 className="max-w-md font-display text-3xl leading-tight text-[var(--ink)]">
            Six chairs. One client each. Book yours.
          </h2>
          <Link
            href="/contact"
            className="rounded-full bg-[var(--ink)] px-7 py-3 font-mono text-xs uppercase tracking-wider text-[var(--paper)] transition hover:bg-[var(--paper)] hover:text-[var(--ink)]"
          >
            Book a slot
          </Link>
        </div>
      </section>
    </>
  );
}
