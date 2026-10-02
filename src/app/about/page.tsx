import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "About — Neva Threading & Beauty Salon",
  description:
    "The story behind Neva Threading & Beauty Salon: a six-chair parlour in a converted Riverside townhouse, and the people who run it.",
};

const team = [
  { name: "Priya Anand", role: "Founder & Colourist", note: "Trained in London, twelve years behind the chair." },
];

const values = [
  { title: "One chair, one client", body: "No stylist runs two heads at once. Your appointment is the only one happening at that station." },
  { title: "Consult before commit", body: "Every service opens with a real conversation, not a rushed glance in the mirror." },
  { title: "Products we'd use ourselves", body: "We carry what we actually reach for at home, and we'll tell you when you don't need the upsell." },
  { title: "Slow room, fast results", body: "The pace is unhurried. The outcome — cut, colour, or calm — still shows up on schedule." },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-[var(--paper-deep)] border-b border-[var(--charcoal)]/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="eyebrow text-[var(--gold)]">Our story</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl leading-tight sm:text-5xl text-[var(--ink)]">
            A beauty salon on Bedford TX, where every visit is a moment for yourself.

           
          </h1>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--charcoal-60)]">
            Neva Threading & Beauty Salon opened in 2026 in bedFord,TX. After its founder spent a decade of experiencing in providing skin care to other clients. We value our customers & make sure customers get the best service according to their needs.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading eyebrow="What we hold to" title="Four working rules" />
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="border-t border-[var(--charcoal)]/15 pt-5">
              <h3 className="font-display text-xl text-[var(--ink)]">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--charcoal-60)]">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

    
    </>
  );
}
